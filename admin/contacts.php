<?php
declare(strict_types=1);

session_name('daitora_news_admin');
session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']), 'samesite' => 'Strict']);
session_start();
require dirname(__DIR__) . '/api/news-lib.php';
require dirname(__DIR__) . '/api/contact-store.php';

header('X-Robots-Tag: noindex, nofollow, noarchive');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");

$error = '';
$config = daitora_news_admin_config();
if (isset($_POST['logout'])) {
    session_destroy(); header('Location: contacts.php'); exit;
}
if (isset($_POST['login'])) {
    $now = time();
    $attempts = array_values(array_filter((array)($_SESSION['login_attempts'] ?? []), static fn($time): bool => is_int($time) && $time > $now - 600));
    if (count($attempts) >= 8) {
        http_response_code(429); $error = 'ログイン試行回数が多すぎます。しばらく待ってください。';
    } elseif ($config['username'] !== '' && $config['password'] !== ''
        && hash_equals($config['username'], trim((string)($_POST['username'] ?? '')))
        && hash_equals($config['password'], (string)($_POST['password'] ?? ''))) {
        session_regenerate_id(true); $_SESSION['news_admin'] = true; unset($_SESSION['login_attempts']);
        header('Location: contacts.php'); exit;
    } else {
        $attempts[] = $now; $_SESSION['login_attempts'] = $attempts; usleep(500000);
        $error = 'ユーザー名またはパスワードが正しくありません。';
    }
}
$loggedIn = !empty($_SESSION['news_admin']);
$records = $loggedIn ? daitora_contact_records() : [];
$selectedMonth = preg_match('/^\d{4}-\d{2}$/', (string)($_GET['month'] ?? '')) ? (string)$_GET['month'] : '';
$selectedType = preg_replace('/[^a-z_\-]/', '', (string)($_GET['type'] ?? ''));
$visible = array_values(array_filter($records, static function(array $record) use ($selectedMonth, $selectedType): bool {
    $monthOk = $selectedMonth === '' || daitora_contact_month((string)$record['submitted_at']) === $selectedMonth;
    $typeOk = $selectedType === '' || (string)($record['data']['type'] ?? '') === $selectedType;
    return $monthOk && $typeOk;
}));
$typeLabels = daitora_contact_type_labels();
$fieldLabels = daitora_contact_field_labels();
$typeCounts = $monthCounts = [];
foreach ($records as $record) {
    $type = (string)($record['data']['type'] ?? 'general');
    $month = daitora_contact_month((string)$record['submitted_at']);
    $typeCounts[$type] = ($typeCounts[$type] ?? 0) + 1;
    if ($month !== '') $monthCounts[$month] = ($monthCounts[$month] ?? 0) + 1;
}
krsort($monthCounts);
function contact_h(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?><!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>お問い合わせ統計 | Daitora</title>
<style>:root{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;color:#17263a;background:#f4f7fb}*{box-sizing:border-box}body{margin:0}main{width:min(1180px,calc(100% - 28px));margin:36px auto}.panel{background:#fff;border:1px solid #dce3ec;padding:24px;margin-bottom:22px}h1,h2,h3{color:#113764}.help{color:#607086;line-height:1.7}.error{padding:12px;background:#fff0ef;color:#a21d14}.actions,.filters{display:flex;flex-wrap:wrap;gap:10px;align-items:end}button,.button{border:0;background:#1c70d8;color:#fff;padding:11px 17px;font-weight:800;text-decoration:none;cursor:pointer}.secondary{background:#e9eef5;color:#113764}label{display:grid;gap:6px;font-weight:700}input,select{padding:10px;border:1px solid #bdc8d6;font:inherit}.login{max-width:480px;margin:12vh auto}.login label+label{margin-top:15px}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}.stat{padding:18px;border:1px solid #dce3ec}.stat strong{display:block;font-size:28px;color:#176fd1}.table{width:100%;border-collapse:collapse}.table th,.table td{padding:10px;border:1px solid #dce3ec;text-align:left;vertical-align:top}.record{border:1px solid #dce3ec;margin-top:14px}.record summary{cursor:pointer;padding:16px;font-weight:800;color:#113764;background:#f8fafc}.record-body{padding:16px;overflow:auto}.record table{min-width:650px}.muted{color:#718096}.nav{display:flex;gap:10px;flex-wrap:wrap}@media(max-width:650px){.panel{padding:17px 13px}.table{font-size:13px}.record summary{padding:13px}}</style></head><body><main>
<?php if(!$loggedIn): ?><section class="panel login"><h1>お問い合わせ統計</h1><p class="help">管理者アカウントでログインしてください。</p><?php if($error):?><p class="error"><?=contact_h($error)?></p><?php endif;?><form method="post"><input type="hidden" name="login" value="1"><label>ユーザー名<input name="username" required autocomplete="username"></label><label>パスワード<input type="password" name="password" required autocomplete="current-password"></label><div class="actions"><button>ログイン</button></div></form></section>
<?php else: ?><header class="actions" style="justify-content:space-between"><div><h1>お問い合わせ統計</h1><p class="help">保存開始後の件数と、各お問い合わせの具体的な内容を確認できます。</p><nav class="nav"><a class="button secondary" href="news.php">ニュース管理</a><a class="button secondary" href="contacts.php">統計トップ</a></nav></div><form method="post"><button class="secondary" name="logout">ログアウト</button></form></header>
<section class="panel"><div class="stats"><div class="stat"><span>保存開始後の累計</span><strong><?=count($records)?></strong></div><?php foreach($typeCounts as $type=>$count):?><div class="stat"><span><?=contact_h($typeLabels[$type]??$type)?></span><strong><?=$count?></strong></div><?php endforeach;?></div></section>
<section class="panel"><h2>絞り込み</h2><form class="filters" method="get"><label>月<select name="month"><option value="">すべて</option><?php foreach($monthCounts as $month=>$count):?><option value="<?=contact_h($month)?>" <?=$month===$selectedMonth?'selected':''?>><?=contact_h($month)?>（<?=$count?>件）</option><?php endforeach;?></select></label><label>種類<select name="type"><option value="">すべて</option><?php foreach($typeLabels as $type=>$label):?><option value="<?=contact_h($type)?>" <?=$type===$selectedType?'selected':''?>><?=contact_h($label)?></option><?php endforeach;?></select></label><button>表示する</button></form></section>
<section class="panel"><h2>お問い合わせ一覧（<?=count($visible)?>件）</h2><?php if(!$visible):?><p class="muted">該当するお問い合わせはありません。</p><?php endif;?><?php foreach($visible as $record):$data=$record['data'];$type=(string)($data['type']??'general');?><details class="record"><summary><?=contact_h(substr((string)$record['submitted_at'],0,16))?>　<?=contact_h($typeLabels[$type]??$type)?>　<?=contact_h((string)($data['name']??''))?>　<span class="muted"><?=contact_h((string)($record['id']??''))?></span></summary><div class="record-body"><table class="table"><tbody><tr><th>送信状態</th><td><?=contact_h((string)($record['delivery_status']??''))?></td></tr><?php foreach($data as $key=>$value):if($value==='')continue;?><tr><th><?=contact_h($fieldLabels[$key]??$key)?></th><td><?=nl2br(contact_h((string)$value))?></td></tr><?php endforeach;?></tbody></table></div></details><?php endforeach;?></section>
<?php endif;?></main></body></html>

