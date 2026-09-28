<?php
declare(strict_types=1);
require __DIR__ . '/news-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=30, stale-while-revalidate=120');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$lang = (string)($_GET['lang'] ?? 'ja');
if (!in_array($lang, DAITORA_NEWS_LANGS, true)) $lang = 'ja';
$limit = max(1, min(100, (int)($_GET['limit'] ?? 100)));
$items = array_values(array_filter(daitora_news_load(), static fn(array $item): bool => !empty($item['published'])));
usort($items, static fn(array $a, array $b): int => strcmp((string)($b['date'] ?? ''), (string)($a['date'] ?? '')));
$items = array_slice($items, 0, $limit);
echo json_encode(['items' => array_map(static fn(array $item): array => daitora_news_localized($item, $lang), $items)], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
