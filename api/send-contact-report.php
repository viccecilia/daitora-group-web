<?php
declare(strict_types=1);

define('DAITORA_CONTACT_TEST', true);
require __DIR__ . '/send-contact.php';
require_once __DIR__ . '/contact-report.php';

$isCli = PHP_SAPI === 'cli';
if (!$isCli) {
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    $expected = daitora_env('DAITORA_CONTACT_REPORT_TOKEN');
    $authorization = (string)($_SERVER['HTTP_AUTHORIZATION'] ?? '');
    $provided = preg_match('/^Bearer\s+(.+)$/i', $authorization, $match) ? trim($match[1]) : '';
    if ($expected === '' || $provided === '' || !hash_equals($expected, $provided)) {
        http_response_code(403); echo json_encode(['success'=>false,'error'=>'forbidden']); exit;
    }
}
$month = $isCli ? (string)($argv[1] ?? '') : (string)($_POST['month'] ?? '');
if (!preg_match('/^\d{4}-\d{2}$/', $month)) $month = date('Y-m', strtotime('first day of previous month'));
$sent = daitora_send_contact_report($month);
if (!$sent) { if(!$isCli)http_response_code(500); echo $isCli?"Report failed\n":json_encode(['success'=>false]); exit(1); }
echo $isCli?"Report sent for {$month}\n":json_encode(['success'=>true,'month'=>$month]);
