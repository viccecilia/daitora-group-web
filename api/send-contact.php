<?php
declare(strict_types=1);

const DAITORA_CONTACT_TO = 'info@daitora-jp.com';
const DAITORA_CONTACT_FROM = 'no-reply@daitora-jp.com';
const DAITORA_CONTACT_RATE_WINDOW = 600;
const DAITORA_CONTACT_RATE_MAX = 5;
const DAITORA_CONTACT_DUPLICATE_WINDOW = 30;

function daitora_json_result(int $status, array $payload, array $headers = []): array
{
    return ['status' => $status, 'payload' => $payload, 'headers' => $headers];
}

function daitora_string_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function daitora_string_slice(string $value, int $length): string
{
    return function_exists('mb_substr') ? mb_substr($value, 0, $length, 'UTF-8') : substr($value, 0, $length);
}

function daitora_field(array $data, string $name): string
{
    if (!array_key_exists($name, $data) || !is_scalar($data[$name])) {
        return '';
    }

    return trim((string)$data[$name]);
}

function daitora_parse_payload(string $contentType, string $rawBody, array $post): array
{
    $mediaType = strtolower(trim(explode(';', $contentType)[0] ?? ''));

    if ($mediaType === 'application/json') {
        $decoded = json_decode($rawBody, true);
        if (!is_array($decoded) || json_last_error() !== JSON_ERROR_NONE) {
            return ['ok' => false, 'status' => 400, 'error' => 'invalid_json'];
        }

        return ['ok' => true, 'data' => $decoded];
    }

    if ($mediaType === 'application/x-www-form-urlencoded' || $mediaType === 'multipart/form-data') {
        return ['ok' => true, 'data' => $post];
    }

    return ['ok' => false, 'status' => 415, 'error' => 'unsupported_media_type'];
}

function daitora_origin_is_allowed(string $origin): bool
{
    if ($origin === '') {
        return true;
    }

    $parts = parse_url($origin);
    if (!is_array($parts) || strtolower((string)($parts['scheme'] ?? '')) !== 'https') {
        return false;
    }

    $host = strtolower((string)($parts['host'] ?? ''));
    return in_array($host, ['daitora-jp.com', 'www.daitora-jp.com'], true);
}

function daitora_privacy_is_accepted($value): bool
{
    if ($value === true || $value === 1) {
        return true;
    }

    return in_array(strtolower(trim((string)$value)), ['1', 'true', 'yes', 'on'], true);
}

function daitora_valid_date(string $value): bool
{
    if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $value, $parts)) {
        return false;
    }

    return checkdate((int)$parts[2], (int)$parts[3], (int)$parts[1]);
}

function daitora_validate_payload(array $data): array
{
    $allowedTypes = ['hire', 'taxi', 'auto', 'corporate', 'recruit', 'general'];
    $allowedLanguages = ['ja', 'en', 'zh-CN', 'ko', 'zh-TW'];
    $requiredCommon = ['type', 'name', 'email', 'message', 'site_language'];
    $requiredByType = [
        'hire' => ['ride_date', 'ride_time', 'pickup', 'destination'],
        'corporate' => ['ride_date', 'ride_time', 'pickup', 'destination'],
        'taxi' => ['taxi_area', 'taxi_time', 'taxi_pickup', 'taxi_destination'],
        'auto' => ['auto_model', 'auto_purpose', 'applicant_type'],
        'recruit' => ['recruit_role', 'work_area', 'experience', 'contact_time'],
        'general' => ['general_subject']
    ];
    $limits = [
        'type' => 20, 'name' => 100, 'company' => 160, 'email' => 254, 'phone' => 40,
        'language' => 40, 'site_language' => 10, 'message' => 4000, 'source_page' => 500,
        'ride_date' => 10, 'ride_time' => 5, 'pickup' => 300, 'destination' => 300,
        'flight_no' => 40, 'passengers' => 3, 'luggage_count' => 3, 'vehicle_type' => 100,
        'ride_purpose' => 120, 'ride_notes' => 2000, 'taxi_area' => 200, 'taxi_time' => 120,
        'taxi_pickup' => 300, 'taxi_destination' => 300, 'taxi_notes' => 2000,
        'auto_model' => 160, 'auto_purpose' => 120, 'applicant_type' => 120,
        'loan_interest' => 80, 'auto_notes' => 2000, 'recruit_role' => 160,
        'work_area' => 160, 'experience' => 500, 'contact_time' => 160,
        'recruit_notes' => 2000, 'general_subject' => 200
    ];

    foreach ($requiredCommon as $name) {
        if (daitora_field($data, $name) === '') {
            return ['ok' => false, 'error' => 'missing_required_fields'];
        }
    }

    $type = daitora_field($data, 'type');
    if (!in_array($type, $allowedTypes, true)) {
        return ['ok' => false, 'error' => 'invalid_type'];
    }

    foreach ($requiredByType[$type] as $name) {
        if (daitora_field($data, $name) === '') {
            return ['ok' => false, 'error' => 'missing_required_fields'];
        }
    }

    if (!daitora_privacy_is_accepted($data['privacy'] ?? '')) {
        return ['ok' => false, 'error' => 'privacy_required'];
    }

    if (daitora_field($data, 'website') !== '') {
        return ['ok' => false, 'error' => 'invalid_submission'];
    }

    $email = daitora_field($data, 'email');
    if (preg_match('/[\r\n]/', $email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['ok' => false, 'error' => 'invalid_email'];
    }

    $siteLanguage = daitora_field($data, 'site_language');
    if (!in_array($siteLanguage, $allowedLanguages, true)) {
        return ['ok' => false, 'error' => 'invalid_language'];
    }

    foreach ($limits as $name => $maxLength) {
        if (array_key_exists($name, $data) && !is_scalar($data[$name])) {
            return ['ok' => false, 'error' => 'invalid_field'];
        }
        if (daitora_string_length(daitora_field($data, $name)) > $maxLength) {
            return ['ok' => false, 'error' => 'field_too_long'];
        }
    }

    foreach (['name', 'company', 'email', 'site_language'] as $headerField) {
        if (preg_match('/[\r\n]/', daitora_field($data, $headerField))) {
            return ['ok' => false, 'error' => 'invalid_header_value'];
        }
    }

    $phone = daitora_field($data, 'phone');
    if ($phone !== '' && !preg_match('/^[0-9+()\-\.\s]+$/', $phone)) {
        return ['ok' => false, 'error' => 'invalid_phone'];
    }

    if (in_array($type, ['hire', 'corporate'], true)) {
        if (!daitora_valid_date(daitora_field($data, 'ride_date')) || !preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', daitora_field($data, 'ride_time'))) {
            return ['ok' => false, 'error' => 'invalid_schedule'];
        }
        foreach ([['passengers', 1, 100], ['luggage_count', 0, 100]] as $numeric) {
            $value = daitora_field($data, $numeric[0]);
            if ($value !== '' && (!ctype_digit($value) || (int)$value < $numeric[1] || (int)$value > $numeric[2])) {
                return ['ok' => false, 'error' => 'invalid_number'];
            }
        }
    }

    $sourcePage = daitora_field($data, 'source_page');
    if ($sourcePage !== '' && (!filter_var($sourcePage, FILTER_VALIDATE_URL) || !preg_match('/^https:\/\//i', $sourcePage))) {
        return ['ok' => false, 'error' => 'invalid_source'];
    }

    return ['ok' => true];
}

function daitora_rate_limit(string $ip, string $fingerprint, int $now): string
{
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'daitora-contact-rate';
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        return 'error';
    }

    $filePath = $directory . DIRECTORY_SEPARATOR . hash('sha256', $ip !== '' ? $ip : 'unknown') . '.json';
    $handle = @fopen($filePath, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return 'error';
    }

    $stored = stream_get_contents($handle);
    $entries = json_decode($stored !== false ? $stored : '[]', true);
    if (!is_array($entries)) {
        $entries = [];
    }
    $entries = array_values(array_filter($entries, static function ($entry) use ($now): bool {
        return is_array($entry) && isset($entry['time']) && (int)$entry['time'] > $now - DAITORA_CONTACT_RATE_WINDOW;
    }));

    $limited = count($entries) >= DAITORA_CONTACT_RATE_MAX;
    foreach ($entries as $entry) {
        if (($entry['fingerprint'] ?? '') === $fingerprint && (int)$entry['time'] > $now - DAITORA_CONTACT_DUPLICATE_WINDOW) {
            $limited = true;
            break;
        }
    }

    if (!$limited) {
        $entries[] = ['time' => $now, 'fingerprint' => $fingerprint];
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($entries, JSON_UNESCAPED_SLASHES));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited ? 'limited' : 'ok';
}

function daitora_subject_piece(string $value): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', trim($value)) ?? '';
    return daitora_string_slice($value, 70);
}

function daitora_mail_content(array $data, int $submittedAt): array
{
    $typeLabels = [
        'hire' => 'Chauffeur Service',
        'taxi' => 'Taxi',
        'auto' => 'Used Cars / Auto Loan',
        'corporate' => 'Corporate / Travel / Hotel',
        'recruit' => 'Recruitment',
        'general' => 'General Inquiry'
    ];
    $languageLabels = [
        'ja' => 'Japanese', 'en' => 'English', 'zh-CN' => 'Simplified Chinese',
        'ko' => 'Korean', 'zh-TW' => 'Traditional Chinese'
    ];
    $fieldLabels = [
        'name' => 'Name / お名前', 'company' => 'Company / 会社名', 'email' => 'Email',
        'phone' => 'Phone / 電話番号', 'language' => 'Preferred language / 希望言語',
        'ride_date' => 'Service date / ご利用日', 'ride_time' => 'Service time / ご利用時間',
        'pickup' => 'Pickup / 出発地', 'destination' => 'Destination / 目的地',
        'flight_no' => 'Flight / 航空便名', 'passengers' => 'Passengers / 人数',
        'luggage_count' => 'Luggage / 手荷物数', 'vehicle_type' => 'Vehicle / 希望車種',
        'ride_purpose' => 'Purpose / 用途', 'ride_notes' => 'Transportation notes / 送迎備考',
        'taxi_area' => 'Taxi area / 利用予定エリア', 'taxi_time' => 'Taxi time / 利用予定日時',
        'taxi_pickup' => 'Taxi pickup / 乗車地', 'taxi_destination' => 'Taxi destination / 目的地',
        'taxi_notes' => 'Taxi notes / タクシー備考', 'auto_model' => 'Desired model / 希望車種',
        'auto_purpose' => 'Vehicle use / 利用目的', 'applicant_type' => 'Applicant / 申込区分',
        'loan_interest' => 'Loan consultation / ローン相談', 'auto_notes' => 'Vehicle purchase notes / 購入備考',
        'recruit_role' => 'Desired role / 希望職種', 'work_area' => 'Preferred work area / 勤務希望エリア',
        'experience' => 'Experience / 経験', 'contact_time' => 'Contact time / 連絡可能時間',
        'recruit_notes' => 'Recruitment notes / 採用備考', 'general_subject' => 'Subject / 件名',
        'message' => 'Inquiry / お問い合わせ内容', 'source_page' => 'Source page / 送信元ページ'
    ];
    $commonFields = ['name', 'company', 'email', 'phone', 'language', 'message', 'source_page'];
    $fieldsByType = [
        'hire' => ['ride_date', 'ride_time', 'pickup', 'destination', 'flight_no', 'passengers', 'luggage_count', 'vehicle_type', 'ride_purpose', 'ride_notes'],
        'corporate' => ['ride_date', 'ride_time', 'pickup', 'destination', 'flight_no', 'passengers', 'luggage_count', 'vehicle_type', 'ride_purpose', 'ride_notes'],
        'taxi' => ['taxi_area', 'taxi_time', 'taxi_pickup', 'taxi_destination', 'taxi_notes'],
        'auto' => ['auto_model', 'auto_purpose', 'applicant_type', 'loan_interest', 'auto_notes'],
        'recruit' => ['recruit_role', 'work_area', 'experience', 'contact_time', 'recruit_notes'],
        'general' => ['general_subject']
    ];
    $type = daitora_field($data, 'type');
    $siteLanguage = daitora_field($data, 'site_language');
    $subject = implode(' / ', [
        '[DAITORA Website Inquiry]',
        $typeLabels[$type],
        $languageLabels[$siteLanguage],
        daitora_subject_piece(daitora_field($data, 'name'))
    ]);
    $lines = [
        'Daitora Group Website Inquiry',
        '',
        'Inquiry type: ' . $typeLabels[$type],
        'Page language: ' . $languageLabels[$siteLanguage],
        ''
    ];
    foreach (array_merge($commonFields, $fieldsByType[$type]) as $name) {
        $label = $fieldLabels[$name];
        $value = daitora_field($data, $name);
        if ($value !== '') {
            $lines[] = $label . ':';
            $lines[] = $value;
            $lines[] = '';
        }
    }
    $lines[] = 'Submitted at: ' . date('Y-m-d H:i:s O', $submittedAt);
    $lines[] = '';
    $lines[] = 'This message is an inquiry only. It does not confirm a booking, vehicle, loan or employment offer.';

    return ['subject' => $subject, 'body' => implode("\n", $lines)];
}

function daitora_real_mail_sender(string $to, string $subject, string $body, string $replyTo): bool
{
    if (!function_exists('mb_send_mail')) {
        return false;
    }
    mb_language('Japanese');
    mb_internal_encoding('UTF-8');
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: Daitora Group Website <' . DAITORA_CONTACT_FROM . '>',
        'Reply-To: ' . $replyTo
    ];
    return mb_send_mail($to, $subject, $body, implode("\r\n", $headers));
}

function daitora_process_contact(
    string $method,
    string $contentType,
    string $rawBody,
    array $post,
    array $server,
    ?callable $mailSender = null,
    ?callable $rateChecker = null,
    ?int $now = null
): array {
    if (strtoupper($method) !== 'POST') {
        return daitora_json_result(405, ['success' => false, 'error' => 'method_not_allowed'], ['Allow' => 'POST']);
    }

    if (!daitora_origin_is_allowed(trim((string)($server['HTTP_ORIGIN'] ?? '')))) {
        return daitora_json_result(403, ['success' => false, 'error' => 'invalid_origin']);
    }

    $parsed = daitora_parse_payload($contentType, $rawBody, $post);
    if (!$parsed['ok']) {
        return daitora_json_result($parsed['status'], ['success' => false, 'error' => $parsed['error']]);
    }

    $data = $parsed['data'];
    $validation = daitora_validate_payload($data);
    if (!$validation['ok']) {
        return daitora_json_result(422, ['success' => false, 'error' => $validation['error']]);
    }

    $timestamp = $now ?? time();
    $fingerprint = hash('sha256', implode('|', [
        daitora_field($data, 'type'), daitora_field($data, 'email'), daitora_field($data, 'message')
    ]));
    $rateResult = $rateChecker
        ? (string)$rateChecker((string)($server['REMOTE_ADDR'] ?? ''), $fingerprint, $timestamp)
        : daitora_rate_limit((string)($server['REMOTE_ADDR'] ?? ''), $fingerprint, $timestamp);
    if ($rateResult === 'limited') {
        return daitora_json_result(429, ['success' => false, 'error' => 'rate_limited'], ['Retry-After' => '60']);
    }
    if ($rateResult !== 'ok') {
        return daitora_json_result(500, ['success' => false, 'error' => 'service_unavailable']);
    }

    $mail = daitora_mail_content($data, $timestamp);
    $sender = $mailSender ?? 'daitora_real_mail_sender';
    $sent = (bool)$sender(DAITORA_CONTACT_TO, $mail['subject'], $mail['body'], daitora_field($data, 'email'));
    if (!$sent) {
        return daitora_json_result(500, ['success' => false, 'error' => 'mail_send_failed']);
    }

    return daitora_json_result(200, ['success' => true]);
}

function daitora_emit_result(array $result): void
{
    http_response_code((int)$result['status']);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    foreach ($result['headers'] as $name => $value) {
        header($name . ': ' . $value);
    }
    echo json_encode($result['payload'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

if (!defined('DAITORA_CONTACT_TEST')) {
    $result = daitora_process_contact(
        (string)($_SERVER['REQUEST_METHOD'] ?? ''),
        (string)($_SERVER['CONTENT_TYPE'] ?? ''),
        (string)file_get_contents('php://input'),
        $_POST,
        $_SERVER
    );
    daitora_emit_result($result);
}
