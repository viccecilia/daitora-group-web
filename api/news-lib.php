<?php
declare(strict_types=1);

const DAITORA_NEWS_LANGS = ['ja', 'en', 'ko', 'zh-CN', 'zh-TW'];

function daitora_news_file(): string
{
    $configured = getenv('DAITORA_NEWS_DATA_FILE');
    return $configured && trim($configured) !== ''
        ? trim($configured)
        : dirname(__DIR__) . '/data/news.json';
}

function daitora_news_load(): array
{
    $file = daitora_news_file();
    if (!is_file($file)) return [];
    $decoded = json_decode((string) file_get_contents($file), true);
    return is_array($decoded) ? array_values(array_filter($decoded, 'is_array')) : [];
}

function daitora_news_save(array $items): void
{
    $file = daitora_news_file();
    $dir = dirname($file);
    if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) {
        throw new RuntimeException('ニュース保存先を作成できません。');
    }
    $json = json_encode(array_values($items), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) throw new RuntimeException('ニュースデータを変換できません。');
    $temp = $file . '.tmp';
    if (file_put_contents($temp, $json . PHP_EOL, LOCK_EX) === false || !rename($temp, $file)) {
        @unlink($temp);
        throw new RuntimeException('ニュースデータを保存できません。');
    }
}

function daitora_news_localized(array $item, string $lang): array
{
    $copy = $item['content'][$lang] ?? $item['content']['ja'] ?? [];
    return [
        'id' => (string)($item['id'] ?? ''),
        'date' => (string)($item['date'] ?? ''),
        'category' => (string)($copy['category'] ?? ($item['content']['ja']['category'] ?? '')),
        'title' => (string)($copy['title'] ?? ''),
        'summary' => (string)($copy['summary'] ?? ''),
        'body' => (string)($copy['body'] ?? ''),
        'tags' => array_values(array_filter((array)($copy['tags'] ?? []), 'is_string')),
        'image' => (string)($item['image'] ?? ''),
        'imageAlt' => (string)($copy['imageAlt'] ?? ($copy['title'] ?? '')),
        'updatedAt' => (string)($item['updatedAt'] ?? ''),
    ];
}

function daitora_news_admin_config(): array
{
    $username = getenv('DAITORA_NEWS_ADMIN_USERNAME');
    $password = getenv('DAITORA_NEWS_ADMIN_PASSWORD');
    $config = __DIR__ . '/news-config.php';
    $values = is_file($config) ? require $config : [];
    $values = is_array($values) ? $values : [];
    return [
        'username' => trim((string)($username ?: ($values['DAITORA_NEWS_ADMIN_USERNAME'] ?? ''))),
        'password' => trim((string)($password ?: ($values['DAITORA_NEWS_ADMIN_PASSWORD'] ?? ''))),
    ];
}
