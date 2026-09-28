<?php
declare(strict_types=1);

$homepage = __DIR__ . '/index.html';
if (!is_file($homepage)) {
    http_response_code(500);
    exit('Homepage is unavailable.');
}

header('Content-Type: text/html; charset=utf-8');
readfile($homepage);
