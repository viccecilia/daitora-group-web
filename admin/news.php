<?php
declare(strict_types=1);

session_name('daitora_news_admin');
session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']), 'samesite' => 'Strict']);
session_start();
require dirname(__DIR__) . '/api/news-lib.php';

header('X-Robots-Tag: noindex, nofollow, noarchive');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");

$error = '';
$notice = '';
$adminConfig = daitora_news_admin_config();

if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: news.php');
    exit;
}

if (isset($_POST['login'])) {
    $now = time();
    $attempts = array_values(array_filter((array)($_SESSION['login_attempts'] ?? []), static fn($time): bool => is_int($time) && $time > $now - 600));
    $username = trim((string)($_POST['username'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    if (count($attempts) >= 8) {
        http_response_code(429);
        $error = 'ログイン試行回数が多すぎます。しばらく待ってからお試しください。';
    } elseif ($adminConfig['username'] !== '' && $adminConfig['password'] !== ''
        && hash_equals($adminConfig['username'], $username)
        && hash_equals($adminConfig['password'], $password)) {
        session_regenerate_id(true);
        $_SESSION['news_admin'] = true;
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
        unset($_SESSION['login_attempts']);
        header('Location: news.php');
        exit;
    } else {
        $attempts[] = $now;
        $_SESSION['login_attempts'] = $attempts;
        usleep(500000);
        $error = 'ユーザー名またはパスワードが正しくありません。';
    }
}

$loggedIn = !empty($_SESSION['news_admin']);

function news_text(string $key, int $max = 5000): string
{
    $value = trim((string)($_POST[$key] ?? ''));
    $value = strip_tags($value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

function news_image_absolute(string $relative): string
{
    $prefix = 'assets/uploads/news/';
    if (strncmp($relative, $prefix, strlen($prefix)) !== 0) return '';
    $name = basename($relative);
    return dirname(__DIR__) . '/assets/uploads/news/' . $name;
}

function news_delete_image(string $relative): void
{
    $file = news_image_absolute($relative);
    if ($file !== '' && is_file($file)) @unlink($file);
}

function news_store_image(array $upload, string $id): string
{
    if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return '';
    if (($upload['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) throw new RuntimeException('画像のアップロードに失敗しました。');
    if ((int)($upload['size'] ?? 0) > 12 * 1024 * 1024) throw new RuntimeException('画像は12MB以下にしてください。');
    $temp = (string)($upload['tmp_name'] ?? '');
    $info = $temp !== '' ? @getimagesize($temp) : false;
    if (!$info || !in_array((string)($info['mime'] ?? ''), ['image/jpeg', 'image/png', 'image/webp'], true)) {
        throw new RuntimeException('JPEG、PNG、WebP画像のみアップロードできます。');
    }
    if ((int)$info[0] < 640 || (int)$info[1] < 360) throw new RuntimeException('画像は640×360px以上を推奨します。');
    if (!function_exists('imagecreatetruecolor') || !function_exists('imagejpeg')) {
        throw new RuntimeException('サーバーの画像変換機能（GD）が利用できません。');
    }
    $mime = (string)$info['mime'];
    $source = false;
    if ($mime === 'image/jpeg') $source = @imagecreatefromjpeg($temp);
    elseif ($mime === 'image/png') $source = @imagecreatefrompng($temp);
    elseif ($mime === 'image/webp' && function_exists('imagecreatefromwebp')) $source = @imagecreatefromwebp($temp);
    if (!$source) throw new RuntimeException('画像を読み込めませんでした。');

    $sourceWidth = imagesx($source);
    $sourceHeight = imagesy($source);
    $targetRatio = 16 / 9;
    $sourceRatio = $sourceWidth / $sourceHeight;
    if ($sourceRatio > $targetRatio) {
        $cropHeight = $sourceHeight;
        $cropWidth = (int)round($sourceHeight * $targetRatio);
        $sourceX = (int)floor(($sourceWidth - $cropWidth) / 2);
        $sourceY = 0;
    } else {
        $cropWidth = $sourceWidth;
        $cropHeight = (int)round($sourceWidth / $targetRatio);
        $sourceX = 0;
        $sourceY = (int)floor(($sourceHeight - $cropHeight) / 2);
    }
    $canvas = imagecreatetruecolor(1600, 900);
    $white = imagecolorallocate($canvas, 255, 255, 255);
    imagefill($canvas, 0, 0, $white);
    imagecopyresampled($canvas, $source, 0, 0, $sourceX, $sourceY, 1600, 900, $cropWidth, $cropHeight);
    $directory = dirname(__DIR__) . '/assets/uploads/news';
    if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
        imagedestroy($source); imagedestroy($canvas);
        throw new RuntimeException('画像保存先を作成できません。');
    }
    $filename = preg_replace('/[^a-zA-Z0-9_-]/', '', $id) . '.jpg';
    $destination = $directory . '/' . $filename;
    $saved = imagejpeg($canvas, $destination, 88);
    imagedestroy($source);
    imagedestroy($canvas);
    if (!$saved) throw new RuntimeException('画像を保存できませんでした。');
    return 'assets/uploads/news/' . $filename;
}

if ($loggedIn && isset($_POST['action'])) {
    if (!hash_equals((string)($_SESSION['csrf'] ?? ''), (string)($_POST['csrf'] ?? ''))) {
        http_response_code(403);
        exit('Invalid CSRF token');
    }
    $items = daitora_news_load();
    $id = preg_replace('/[^a-zA-Z0-9_-]/', '', (string)($_POST['id'] ?? '')) ?: bin2hex(random_bytes(8));
    $existing = null;
    foreach ($items as $item) if (($item['id'] ?? '') === $id) $existing = $item;

    if ($_POST['action'] === 'delete') {
        if ($existing) news_delete_image((string)($existing['image'] ?? ''));
        $items = array_values(array_filter($items, static fn(array $item): bool => ($item['id'] ?? '') !== $id));
        daitora_news_save($items);
        $notice = '削除しました。';
    } else {
        $date = news_text('date', 10);
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || news_text('title_ja', 180) === '' || news_text('body_ja', 8000) === '') {
            $error = '公開日、日本語タイトル、日本語本文は必須です。';
        }
        if ($error === '') {
            try {
                $image = (string)($existing['image'] ?? '');
                if (!empty($_POST['remove_image'])) {
                    news_delete_image($image);
                    $image = '';
                }
                $uploadedImage = news_store_image((array)($_FILES['image'] ?? []), $id);
                if ($uploadedImage !== '') $image = $uploadedImage;

                $content = [];
                foreach (DAITORA_NEWS_LANGS as $lang) {
                    $suffix = str_replace('-', '_', $lang);
                    $fallback = $lang === 'ja' ? [] : ($content['ja'] ?? []);
                    $tags = array_values(array_filter(array_map('trim', explode(',', news_text('tags_' . $suffix, 500)))));
                    $content[$lang] = [
                        'category' => news_text('category_' . $suffix, 60) ?: ($fallback['category'] ?? ''),
                        'title' => news_text('title_' . $suffix, 180) ?: ($fallback['title'] ?? ''),
                        'summary' => news_text('summary_' . $suffix, 500) ?: ($fallback['summary'] ?? ''),
                        'body' => news_text('body_' . $suffix, 8000) ?: ($fallback['body'] ?? ''),
                        'imageAlt' => news_text('image_alt_' . $suffix, 180) ?: ($fallback['imageAlt'] ?? ($fallback['title'] ?? '')),
                        'tags' => $tags ?: ($fallback['tags'] ?? []),
                    ];
                }
                $record = ['id' => $id, 'date' => $date, 'published' => isset($_POST['published']), 'image' => $image, 'content' => $content, 'updatedAt' => gmdate('c')];
                $found = false;
                foreach ($items as $index => $item) if (($item['id'] ?? '') === $id) { $items[$index] = $record; $found = true; break; }
                if (!$found) $items[] = $record;
                daitora_news_save($items);
                $notice = '保存しました。公開設定の場合はグループサイトへ自動反映されます。';
            } catch (RuntimeException $exception) {
                $error = $exception->getMessage();
            }
        }
    }
}

$items = $loggedIn ? daitora_news_load() : [];
$editId = (string)($_GET['edit'] ?? '');
$editing = null;
foreach ($items as $item) if (($item['id'] ?? '') === $editId) $editing = $item;
?><!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>ニュース管理 | Daitora</title><script src="../assets/js/admin-news.js" defer></script>
<style>
:root{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;color:#152033;background:#f4f7fb}*{box-sizing:border-box}body{margin:0}main{width:min(1180px,calc(100% - 32px));margin:40px auto}.panel{background:#fff;border:1px solid #dce3ec;padding:28px;margin-bottom:24px}h1,h2{color:#113764}.help{color:#607086;line-height:1.7}.format-note{padding:16px 18px;border-left:3px solid #c99a3f;background:#f8fafc;color:#43536a;line-height:1.7}label{display:grid;gap:7px;font-weight:700}input,textarea{width:100%;padding:11px;border:1px solid #bdc8d6;font:inherit}textarea{min-height:110px;resize:vertical}.body-field{min-height:190px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:20px}button,.button{border:0;background:#1c70d8;color:#fff;padding:11px 18px;font-weight:800;text-decoration:none;cursor:pointer}.secondary{background:#e9eef5;color:#113764}.danger{background:#b42318}.message{padding:12px;background:#edf8f0;color:#176b34}.error{padding:12px;background:#fff0ef;color:#a21d14}.list{width:100%;border-collapse:collapse}.list th,.list td{padding:13px 8px;border-bottom:1px solid #e1e6ed;text-align:left}.lang{margin-top:22px;padding:22px;border:1px solid #e1e6ed}.preview{display:block;width:min(480px,100%);aspect-ratio:16/9;object-fit:cover;margin-top:12px;border:1px solid #dce3ec}.check{display:flex;align-items:center;gap:8px}.check input{width:auto}.login{max-width:480px;margin:12vh auto}.login label+label{margin-top:16px}@media(max-width:700px){.grid{grid-template-columns:1fr}.panel{padding:20px 16px}.list th:nth-child(2),.list td:nth-child(2){display:none}}
</style></head><body><main>
<?php if (!$loggedIn): ?>
<section class="panel login"><h1>ニュース管理</h1><p class="help">管理者アカウントでログインしてください。</p><?php if($error):?><p class="error"><?=htmlspecialchars($error)?></p><?php endif;?><form method="post"><input type="hidden" name="login" value="1"><label>ユーザー名<input type="text" name="username" required autocomplete="username"></label><label>パスワード<input type="password" name="password" required autocomplete="current-password"></label><div class="actions"><button>ログイン</button></div></form></section>
<?php else: ?>
<header class="actions" style="justify-content:space-between"><div><h1>ニュース管理</h1><p class="help">登録した公開ニュースはグループサイトへ自動反映されます。</p></div><form method="post"><button class="secondary" name="logout">ログアウト</button></form></header>
<?php if($notice):?><p class="message"><?=htmlspecialchars($notice)?></p><?php endif;?><?php if($error):?><p class="error"><?=htmlspecialchars($error)?></p><?php endif;?>
<section class="panel"><h2><?= $editing ? 'ニュースを編集' : 'ニュースを追加' ?></h2><p class="format-note">画像はアップロード時に1600×900px・16:9のJPEGへ自動変換されます。タイトル・本文の字体、サイズ、色、余白はサイト側で固定されるため、入力内容によってデザインが崩れることはありません。</p>
<form method="post" enctype="multipart/form-data"><input type="hidden" name="csrf" value="<?=htmlspecialchars((string)$_SESSION['csrf'])?>"><input type="hidden" name="action" value="save"><input type="hidden" name="id" value="<?=htmlspecialchars((string)($editing['id'] ?? ''))?>">
<div class="grid"><label>公開日<input type="date" name="date" required value="<?=htmlspecialchars((string)($editing['date'] ?? date('Y-m-d')))?>"></label><label class="check" style="align-self:end"><input type="checkbox" name="published" <?=!isset($editing['published'])||!empty($editing['published'])?'checked':''?>> 公開する</label></div>
<div class="lang"><h3>メイン画像</h3><label>画像（JPEG・PNG・WebP、12MB以下）<input type="file" name="image" accept="image/jpeg,image/png,image/webp"></label><?php if(!empty($editing['image'])):?><img class="preview" src="../<?=htmlspecialchars((string)$editing['image'])?>?v=<?=urlencode((string)($editing['updatedAt']??''))?>" alt=""><label class="check"><input type="checkbox" name="remove_image"> 現在の画像を削除する</label><?php endif;?></div>
<?php foreach(DAITORA_NEWS_LANGS as $lang):$s=str_replace('-','_',$lang);$c=$editing['content'][$lang]??[];?><fieldset class="lang"><legend><strong><?=$lang?></strong><?=$lang==='ja'?'（必須）':'（空欄は日本語を表示）'?></legend><div class="grid"><label>分類<input name="category_<?=$s?>" value="<?=htmlspecialchars((string)($c['category']??''))?>"></label><label>タグ（カンマ区切り）<input name="tags_<?=$s?>" value="<?=htmlspecialchars(implode(', ',(array)($c['tags']??[])))?>"></label></div><label>タイトル<input name="title_<?=$s?>" <?=$lang==='ja'?'required':''?> value="<?=htmlspecialchars((string)($c['title']??''))?>"></label><label>画像説明（アクセシビリティ用）<input name="image_alt_<?=$s?>" value="<?=htmlspecialchars((string)($c['imageAlt']??''))?>" placeholder="空欄の場合はタイトルを使用"></label><label>一覧用の要約<textarea name="summary_<?=$s?>"><?=htmlspecialchars((string)($c['summary']??''))?></textarea></label><label>本文<textarea class="body-field" name="body_<?=$s?>" <?=$lang==='ja'?'required':''?>><?=htmlspecialchars((string)($c['body']??''))?></textarea></label></fieldset><?php endforeach;?>
<div class="actions"><button>保存</button><a class="button secondary" href="news.php">新規入力に戻る</a></div></form></section>
<section class="panel"><h2>登録済みニュース</h2><table class="list"><thead><tr><th>日付</th><th>状態</th><th>タイトル</th><th>操作</th></tr></thead><tbody><?php usort($items,fn($a,$b)=>strcmp($b['date']??'',$a['date']??''));foreach($items as $item):?><tr><td><?=htmlspecialchars((string)$item['date'])?></td><td><?=!empty($item['published'])?'公開':'下書き'?></td><td><?=htmlspecialchars((string)($item['content']['ja']['title']??''))?></td><td><div class="actions" style="margin:0"><a class="button secondary" href="?edit=<?=urlencode((string)$item['id'])?>">編集</a><form method="post" data-confirm-delete><input type="hidden" name="csrf" value="<?=htmlspecialchars((string)$_SESSION['csrf'])?>"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?=htmlspecialchars((string)$item['id'])?>"><button class="danger">削除</button></form></div></td></tr><?php endforeach;?></tbody></table></section>
<?php endif; ?>
</main></body></html>
