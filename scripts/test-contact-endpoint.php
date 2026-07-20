<?php
declare(strict_types=1);

define('DAITORA_CONTACT_TEST', true);
require dirname(__DIR__) . '/api/send-contact.php';

function test_assert(bool $condition, string $message): void
{
    if (!$condition) {
        fwrite(STDERR, "FAIL: {$message}\n");
        exit(1);
    }
}

function valid_payload(): array
{
    return [
        'type' => 'hire',
        'name' => 'Test Customer',
        'company' => 'Test Company',
        'email' => 'customer@example.com',
        'phone' => '+81 6 0000 0000',
        'language' => 'English',
        'site_language' => 'en',
        'privacy' => 'on',
        'website' => '',
        'message' => 'Airport transfer enquiry.',
        'ride_date' => '2026-08-20',
        'ride_time' => '14:30',
        'pickup' => 'Kansai International Airport',
        'destination' => 'Kyoto Station',
        'flight_no' => 'DA123',
        'passengers' => '3',
        'luggage_count' => '4',
        'vehicle_type' => 'Alphard',
        'ride_purpose' => 'Corporate travel',
        'source_page' => 'https://daitora-jp.com/en/contact.html?type=hire'
    ];
}

function allow_rate(string $ip, string $fingerprint, int $now): string
{
    return 'ok';
}

function process_payload(
    array $payload,
    ?callable $mailSender = null,
    ?callable $rateChecker = null,
    string $host = 'daitora-jp.com',
    ?string $origin = 'https://daitora-jp.com'
): array
{
    $server = ['REMOTE_ADDR' => '192.0.2.20', 'HTTP_HOST' => $host];
    if ($origin !== null) {
        $server['HTTP_ORIGIN'] = $origin;
    }
    return daitora_process_contact(
        'POST',
        'application/json; charset=UTF-8',
        (string)json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        [],
        $server,
        $mailSender,
        $rateChecker ?? 'allow_rate',
        1784500000
    );
}

$captured = [];
$mailSender = static function (string $to, string $subject, string $body, string $replyTo) use (&$captured): bool {
    $captured = compact('to', 'subject', 'body', 'replyTo');
    return true;
};

$result = process_payload(valid_payload(), $mailSender);
test_assert($result['status'] === 200 && $result['payload'] === ['success' => true], 'valid JSON request must succeed');
test_assert($captured['to'] === 'info@daitora-jp.com', 'recipient must be fixed');
test_assert(DAITORA_CONTACT_FROM === 'no-reply@daitora-jp.com', 'From address must be fixed');
test_assert($captured['replyTo'] === 'customer@example.com', 'validated customer email must be Reply-To');
test_assert(strpos($captured['body'], 'Kansai International Airport') !== false, 'mail body must contain validated transport details');
test_assert(strpos($captured['subject'], '[STAGING]') === false, 'production subject must not contain the staging prefix');

foreach ([
    ['daitora-jp.com', 'https://daitora-jp.com', false],
    ['www.daitora-jp.com', 'https://www.daitora-jp.com', false],
    ['taxi-airport.jp', 'https://taxi-airport.jp', true],
    ['www.taxi-airport.jp', 'https://www.taxi-airport.jp', true],
] as [$host, $origin, $staging]) {
    $captured = [];
    $siteResult = process_payload(valid_payload(), $mailSender, null, $host, $origin);
    test_assert($siteResult['status'] === 200, "allowed Host/Origin pair must succeed: {$host}");
    test_assert((strpos($captured['subject'], '[STAGING]') === 0) === $staging, "subject environment prefix must match Host: {$host}");
}

$formPayload = valid_payload();
$result = daitora_process_contact(
    'POST',
    'application/x-www-form-urlencoded',
    '',
    $formPayload,
    ['REMOTE_ADDR' => '192.0.2.21', 'HTTP_HOST' => 'daitora-jp.com'],
    $mailSender,
    'allow_rate',
    1784500000
);
test_assert($result['status'] === 200, 'form-urlencoded compatibility must succeed');

$result = daitora_process_contact('GET', 'application/json', '{}', [], [], $mailSender, 'allow_rate', 1784500000);
test_assert($result['status'] === 405 && ($result['headers']['Allow'] ?? '') === 'POST', 'non-POST requests must be rejected');

$result = daitora_process_contact('POST', 'application/json', '{bad', [], [], $mailSender, 'allow_rate', 1784500000);
test_assert($result['status'] === 400, 'invalid JSON must return 400');

$missing = valid_payload();
unset($missing['pickup']);
test_assert(process_payload($missing, $mailSender)['status'] === 422, 'missing type-specific required field must return 422');

$invalidEmail = valid_payload();
$invalidEmail['email'] = "customer@example.com\r\nBcc: victim@example.com";
test_assert(process_payload($invalidEmail, $mailSender)['status'] === 422, 'header injection must be rejected');

$invalidEmail = valid_payload();
$invalidEmail['email'] = 'not-an-email';
test_assert(process_payload($invalidEmail, $mailSender)['status'] === 422, 'invalid email must be rejected');

$invalidType = valid_payload();
$invalidType['type'] = 'unknown';
test_assert(process_payload($invalidType, $mailSender)['status'] === 422, 'unknown contact type must be rejected');

$tooLong = valid_payload();
$tooLong['message'] = str_repeat('a', 4001);
test_assert(process_payload($tooLong, $mailSender)['status'] === 422, 'oversized input must be rejected');

$honeypot = valid_payload();
$honeypot['website'] = 'https://spam.example';
test_assert(process_payload($honeypot, $mailSender)['status'] === 422, 'honeypot submissions must be rejected');

$limited = static function (string $ip, string $fingerprint, int $now): string { return 'limited'; };
test_assert(process_payload(valid_payload(), $mailSender, $limited)['status'] === 429, 'rate-limited request must return 429');

$rateIp = '203.0.113.240';
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'daitora-contact-rate' . DIRECTORY_SEPARATOR . hash('sha256', $rateIp) . '.json';
@unlink($rateFile);
test_assert(daitora_rate_limit($rateIp, 'test-fingerprint', 1784500000) === 'ok', 'first rate-limit check must pass');
test_assert(daitora_rate_limit($rateIp, 'test-fingerprint', 1784500001) === 'limited', 'duplicate submission must be limited');
@unlink($rateFile);

$failedSender = static function (string $to, string $subject, string $body, string $replyTo): bool { return false; };
$result = process_payload(valid_payload(), $failedSender);
test_assert($result['status'] === 500 && $result['payload']['success'] === false, 'mail transport failure must not report success');

$originFailures = [
    ['daitora-jp.com', 'https://www.taxi-airport.jp', 'production Host with staging Origin'],
    ['taxi-airport.jp', 'https://www.daitora-jp.com', 'staging Host with production Origin'],
    ['daitora-jp.com', 'http://daitora-jp.com', 'HTTP Origin'],
    ['daitora-jp.com', 'https://attacker.example', 'unknown Origin'],
    ['unknown.example', 'https://daitora-jp.com', 'unknown Host'],
];
foreach ($originFailures as [$host, $origin, $label]) {
    $failed = process_payload(valid_payload(), $mailSender, null, $host, $origin);
    test_assert($failed['status'] === 403, "{$label} must be rejected");
}

$missingOrigin = process_payload(valid_payload(), $mailSender, null, 'daitora-jp.com', null);
test_assert($missingOrigin['status'] === 200, 'missing Origin is allowed only by the explicit non-browser test mode');

test_assert(daitora_origin_is_allowed('', 'daitora-jp.com', false) === false, 'production logic must reject a missing Origin');
test_assert(daitora_origin_is_allowed('', 'daitora-jp.com', true) === true, 'explicit non-browser test logic may allow a missing Origin');
test_assert(daitora_origin_is_allowed('https://www.daitora-jp.com', 'daitora-jp.com') === true, 'www and apex hosts in the same production site may match');
test_assert(daitora_origin_is_allowed('https://www.taxi-airport.jp', 'taxi-airport.jp') === true, 'www and apex hosts in the same staging site may match');
test_assert(daitora_origin_is_allowed('https://daitora-jp.com/path', 'daitora-jp.com') === false, 'Origin paths must be rejected');
test_assert(daitora_origin_is_allowed('https://daitora-jp.com:8443', 'daitora-jp.com') === false, 'non-HTTPS-default Origin ports must be rejected');

echo "Contact endpoint tests passed\n";
