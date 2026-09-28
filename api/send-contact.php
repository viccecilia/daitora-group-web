<?php
declare(strict_types=1);

const DAITORA_CONTACT_TO_DEFAULT = 'info@daitora-jp.com';
const DAITORA_CONTACT_BACKUP_TO_DEFAULT = 's_pang@daitora-jp.com';
const DAITORA_CONTACT_FROM = 'no-reply@daitora-jp.com';
const DAITORA_CONTACT_RATE_WINDOW = 600;
const DAITORA_CONTACT_RATE_MAX = 5;
const DAITORA_CONTACT_DUPLICATE_WINDOW = 30;
const DAITORA_CONTACT_SIGNATURE_WINDOW = 300;

require_once __DIR__ . '/contact-store.php';

function daitora_env(string $key, string $default = ''): string
{
    $value = getenv($key);
    if ($value !== false && trim((string)$value) !== '') {
        return trim((string)$value);
    }

    static $contactConfig = null;
    if ($contactConfig === null) {
        $configFile = __DIR__ . '/contact-config.php';
        $loaded = is_file($configFile) ? require $configFile : [];
        $contactConfig = is_array($loaded) ? $loaded : [];
    }

    $configured = $contactConfig[$key] ?? $default;
    return is_scalar($configured) ? trim((string)$configured) : $default;
}

function daitora_contact_recipient(): string
{
    $configured = daitora_env('DAITORA_CONTACT_TO', DAITORA_CONTACT_TO_DEFAULT);
    if (preg_match('/[\r\n]/', $configured) || !filter_var($configured, FILTER_VALIDATE_EMAIL)) {
        return DAITORA_CONTACT_TO_DEFAULT;
    }

    return $configured;
}

function daitora_contact_backup_recipient(): string
{
    $configured = daitora_env('DAITORA_CONTACT_BACKUP_TO', DAITORA_CONTACT_BACKUP_TO_DEFAULT);
    if (preg_match('/[\r\n]/', $configured) || !filter_var($configured, FILTER_VALIDATE_EMAIL)) {
        return DAITORA_CONTACT_BACKUP_TO_DEFAULT;
    }

    return $configured;
}

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

function daitora_request_site(string $host): string
{
    $host = strtolower(rtrim(trim($host), '.'));
    if ($host === '') {
        return '';
    }

    $parsedHost = parse_url('http://' . $host, PHP_URL_HOST);
    if (!is_string($parsedHost) || $parsedHost === '') {
        return '';
    }

    if (in_array($parsedHost, ['daitora-jp.com', 'www.daitora-jp.com'], true)) {
        return 'production';
    }
    if (in_array($parsedHost, ['taxi-airport.jp', 'www.taxi-airport.jp'], true)) {
        return 'staging';
    }

    return '';
}

function daitora_origin_is_allowed(string $origin, string $requestHost, bool $allowMissingOrigin = false): bool
{
    if ($origin === '') {
        return $allowMissingOrigin;
    }

    $requestSite = daitora_request_site($requestHost);
    if ($requestSite === '') {
        return false;
    }

    $parts = parse_url($origin);
    if (!is_array($parts) || strtolower((string)($parts['scheme'] ?? '')) !== 'https') {
        return false;
    }

    if (isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) {
        return false;
    }
    if (isset($parts['port']) && (int)$parts['port'] !== 443) {
        return false;
    }
    if (isset($parts['path']) && $parts['path'] !== '' && $parts['path'] !== '/') {
        return false;
    }

    $host = strtolower((string)($parts['host'] ?? ''));
    return daitora_request_site($host) === $requestSite;
}

function daitora_service_signature_is_valid(array $server, string $rawBody, int $now): bool
{
    $secret = daitora_env('DAITORA_CONTACT_SHARED_SECRET');
    $clientId = trim((string)($server['HTTP_X_DAITORA_CLIENT_ID'] ?? ''));
    $timestamp = trim((string)($server['HTTP_X_DAITORA_CONTACT_TIMESTAMP'] ?? ''));
    $signature = strtolower(trim((string)($server['HTTP_X_DAITORA_CONTACT_SIGNATURE'] ?? '')));
    if ($secret === '' || $clientId !== 'japan-travel' || !ctype_digit($timestamp) || !preg_match('/^[a-f0-9]{64}$/', $signature)) {
        return false;
    }
    if (abs($now - (int)$timestamp) > DAITORA_CONTACT_SIGNATURE_WINDOW) {
        return false;
    }
    $expected = hash_hmac('sha256', $timestamp . "\n" . $rawBody, $secret);
    return hash_equals($expected, $signature);
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
    $allowedTypes = ['hire', 'taxi', 'auto', 'corporate', 'recruit', 'general', 'japan_travel'];
    $allowedLanguages = ['ja', 'en', 'zh-CN', 'ko', 'zh-TW', 'zh-cn', 'zh-tw'];
    $requiredCommon = ['type', 'name', 'email', 'site_language'];
    $requiredByType = [
        'hire' => ['transport_plan', 'pickup', 'destination'],
        'corporate' => ['transport_plan', 'pickup', 'destination'],
        'taxi' => ['taxi_area', 'taxi_time', 'taxi_pickup', 'taxi_destination'],
        'auto' => ['auto_model', 'auto_purpose', 'applicant_type'],
        'recruit' => ['recruit_role', 'work_area', 'experience', 'contact_time'],
        'general' => ['general_subject'],
        'japan_travel' => ['service_type', 'pickup_location', 'dropoff_location', 'itinerary']
    ];
    $limits = [
        'type' => 20, 'name' => 100, 'company' => 160, 'email' => 254, 'phone' => 40,
        'language' => 40, 'site_language' => 10, 'message' => 4000, 'source_page' => 500,
        'ride_date' => 10, 'ride_time' => 5, 'pickup' => 300, 'destination' => 300,
        'flight_no' => 40, 'passengers' => 3, 'luggage_count' => 3, 'vehicle_type' => 100,
        'ride_notes' => 2000, 'taxi_area' => 200, 'taxi_time' => 120,
        'transport_plan' => 40, 'flight_direction' => 80, 'flight_time' => 5, 'flight_no_unknown' => 3,
        'nationality' => 100, 'driver_language' => 80, 'itinerary_date' => 10,
        'itinerary_start_time' => 5, 'itinerary_end_date' => 10, 'itinerary_end_time' => 5, 'itinerary_hotel' => 200,
        'itinerary_route' => 3000, 'itinerary_duration' => 80,
        'tax_status' => 80, 'toll_status' => 80, 'parking_status' => 80,
        'driver_lodging' => 40, 'payment_timing' => 100,
        'taxi_pickup' => 300, 'taxi_destination' => 300, 'taxi_notes' => 2000,
        'auto_model' => 160, 'auto_purpose' => 120, 'applicant_type' => 120,
        'loan_interest' => 80, 'auto_notes' => 2000, 'recruit_role' => 160,
        'work_area' => 160, 'experience' => 500, 'contact_time' => 160,
        'recruit_notes' => 2000, 'general_subject' => 200,
        'service_type' => 120, 'travel_date' => 10, 'travel_time' => 5,
        'flight_number' => 40, 'pickup_location' => 300, 'dropoff_location' => 300,
        'passenger_count' => 3, 'vehicle_preference' => 120, 'itinerary' => 4000,
        'contact_method' => 80, 'page_language' => 10, 'request_id' => 80,
        'source_site' => 80, 'source_channel' => 80, 'landing_page' => 500,
        'visitor_id' => 120, 'ref_code' => 100, 'utm_source' => 120,
        'utm_medium' => 120, 'utm_campaign' => 120, 'utm_content' => 120
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
        foreach ([['passengers', 1, 100], ['luggage_count', 0, 100]] as $numeric) {
            $value = daitora_field($data, $numeric[0]);
            if ($value !== '' && (!ctype_digit($value) || (int)$value < $numeric[1] || (int)$value > $numeric[2])) {
                return ['ok' => false, 'error' => 'invalid_number'];
            }
        }
        if (!in_array(daitora_field($data, 'transport_plan'), ['airport_only', 'airport_charter', 'charter_only'], true)) {
            return ['ok' => false, 'error' => 'invalid_transport_plan'];
        }
        $transportPlan = daitora_field($data, 'transport_plan');
        if ($transportPlan !== 'charter_only') {
            if (!daitora_valid_date(daitora_field($data, 'ride_date')) || !preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', daitora_field($data, 'ride_time'))) {
                return ['ok' => false, 'error' => 'invalid_schedule'];
            }
            if (daitora_field($data, 'flight_no') === '' && daitora_field($data, 'flight_no_unknown') !== 'yes') {
                return ['ok' => false, 'error' => 'missing_flight_number'];
            }
        }
        foreach (['flight_time', 'itinerary_start_time', 'itinerary_end_time'] as $timeField) {
            $value = daitora_field($data, $timeField);
            if ($value !== '' && !preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', $value)) {
                return ['ok' => false, 'error' => 'invalid_schedule'];
            }
        }
        $itineraryDate = daitora_field($data, 'itinerary_date');
        $itineraryEndDate = daitora_field($data, 'itinerary_end_date');
        if (($itineraryDate !== '' && !daitora_valid_date($itineraryDate)) || ($itineraryEndDate !== '' && !daitora_valid_date($itineraryEndDate))) {
            return ['ok' => false, 'error' => 'invalid_schedule'];
        }
        if (in_array($transportPlan, ['airport_charter', 'charter_only'], true)) {
            if ($itineraryDate === '' || $itineraryEndDate === '' || daitora_field($data, 'itinerary_start_time') === '' || daitora_field($data, 'itinerary_end_time') === '') {
                return ['ok' => false, 'error' => 'missing_required_fields'];
            }
            $start = strtotime($itineraryDate . ' ' . daitora_field($data, 'itinerary_start_time'));
            $end = strtotime($itineraryEndDate . ' ' . daitora_field($data, 'itinerary_end_time'));
            if ($start === false || $end === false || $end <= $start) {
                return ['ok' => false, 'error' => 'invalid_schedule'];
            }
        }
    }

    if ($type === 'japan_travel') {
        $travelDate = daitora_field($data, 'travel_date');
        $travelTime = daitora_field($data, 'travel_time');
        if ($travelDate !== '' && !daitora_valid_date($travelDate)) {
            return ['ok' => false, 'error' => 'invalid_schedule'];
        }
        if ($travelTime !== '' && !preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', $travelTime)) {
            return ['ok' => false, 'error' => 'invalid_schedule'];
        }
        foreach ([['passenger_count', 1, 100], ['luggage_count', 0, 100]] as $numeric) {
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

function daitora_rate_limit(string $ip, string $fingerprint, int $now, int $max = DAITORA_CONTACT_RATE_MAX, int $window = DAITORA_CONTACT_RATE_WINDOW): string
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
    $entries = array_values(array_filter($entries, static function ($entry) use ($now, $window): bool {
        return is_array($entry) && isset($entry['time']) && (int)$entry['time'] > $now - $window;
    }));

    $limited = count($entries) >= $max;
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

function daitora_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function daitora_mail_rows(array $data, array $fields, bool $showEmpty = false): string
{
    $html = '';
    foreach ($fields as $name => $label) {
        $value = daitora_field($data, $name);
        if ($value === '' && !$showEmpty) {
            continue;
        }
        $display = $value !== '' ? nl2br(daitora_html($value)) : '<span style="color:#7a8796">未入力</span>';
        $html .= '<tr><th style="width:32%;padding:10px 12px;border:1px solid #d7dde5;background:#f3f6f9;color:#123761;text-align:left;vertical-align:top">'
            . daitora_html($label)
            . '</th><td style="padding:10px 12px;border:1px solid #d7dde5;color:#24364a;vertical-align:top">'
            . $display . '</td></tr>';
    }
    return $html;
}

function daitora_mail_section(string $title, string $rows): string
{
    if ($rows === '') {
        return '';
    }
    return '<h2 style="margin:26px 0 8px;padding:10px 14px;background:#123761;color:#fff;font-size:16px">'
        . daitora_html($title)
        . '</h2><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.65">'
        . $rows . '</table>';
}

function daitora_mail_plain_text(string $html): string
{
    $text = preg_replace_callback('/<tr>\s*<th[^>]*>(.*?)<\/th>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/is', static function (array $match): string {
        $label = html_entity_decode(strip_tags(str_ireplace(['<br>', '<br/>', '<br />'], "\n", $match[1])), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $value = html_entity_decode(strip_tags(str_ireplace(['<br>', '<br/>', '<br />'], "\n", $match[2])), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $value = preg_replace('/\n+/', "\n    ", trim($value)) ?? trim($value);
        return '■ ' . trim($label) . '：' . ($value !== '' ? $value : '未入力') . "\n";
    }, $html) ?? $html;
    $text = preg_replace_callback('/<h2[^>]*>(.*?)<\/h2>/is', static function (array $match): string {
        return "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【" . trim(html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8')) . "】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }, $text) ?? $text;
    $text = preg_replace_callback('/<h1[^>]*>(.*?)<\/h1>/is', static function (array $match): string {
        return trim(html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8')) . "\n";
    }, $text) ?? $text;
    $text = preg_replace('/<br\s*\/?>/i', "\n", $text) ?? $text;
    $text = preg_replace('/<\/p>/i', "\n", $text) ?? $text;
    $text = html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = preg_replace('/[ \t]+\n/', "\n", $text) ?? $text;
    $text = preg_replace('/\n{3,}/', "\n\n", $text) ?? $text;
    return trim($text) . "\n";
}

function daitora_mail_content(array $data, int $submittedAt, bool $staging): array
{
    $typeLabels = [
        'hire' => 'ハイヤー・空港送迎', 'taxi' => 'タクシー利用',
        'auto' => '中古車販売・ローン相談', 'corporate' => '法人・旅行会社・ホテル様',
        'recruit' => '採用・乗務員応募', 'general' => 'その他のお問い合わせ'
    ];
    $languageLabels = [
        'ja' => '日本語', 'en' => '英語', 'zh-CN' => '簡体字中国語',
        'zh-cn' => '簡体字中国語', 'ko' => '韓国語', 'zh-TW' => '繁体字中国語',
        'zh-tw' => '繁体字中国語'
    ];
    $type = daitora_field($data, 'type');
    $siteLanguage = daitora_field($data, 'site_language');
    $subject = '[DAITORA お問い合わせ] ' . $typeLabels[$type] . '｜' . daitora_subject_piece(daitora_field($data, 'name'));
    if ($staging) {
        $subject = '[STAGING] ' . $subject;
    }

    $common = [
        'name' => 'お客様代表者名', 'company' => '会社名・団体名', 'email' => 'メールアドレス',
        'phone' => '連絡先', 'language' => '希望言語', 'message' => 'お問い合わせ内容'
    ];
    $fieldsByType = [
        'taxi' => ['taxi_area' => '利用予定エリア', 'taxi_time' => '利用予定日時', 'taxi_pickup' => '乗車地', 'taxi_destination' => '目的地', 'taxi_notes' => 'タクシー利用に関する備考'],
        'auto' => ['auto_model' => '希望車種', 'auto_purpose' => '利用目的', 'applicant_type' => '申込区分', 'loan_interest' => 'ローン相談', 'auto_notes' => '車両購入に関する備考'],
        'recruit' => ['recruit_role' => '希望職種', 'work_area' => '勤務希望エリア', 'experience' => '運転・接客経験', 'contact_time' => '連絡可能時間', 'recruit_notes' => '採用に関する備考'],
        'general' => ['general_subject' => 'お問い合わせ件名']
    ];
    $body = '<!doctype html><html lang="ja"><body style="margin:0;background:#f2f5f8;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Meiryo,sans-serif">'
        . '<div style="max-width:760px;margin:0 auto;padding:28px 18px"><div style="padding:24px;background:#fff;border-top:4px solid #b78a2f">'
        . '<p style="margin:0;color:#b07d1e;font-size:12px;font-weight:700;letter-spacing:.14em">DAITORA GROUP</p>'
        . '<h1 style="margin:6px 0 4px;color:#123761;font-size:24px">ウェブサイトお問い合わせ</h1>'
        . '<p style="margin:0;color:#607083">' . daitora_html($typeLabels[$type]) . ' / 表示言語：' . daitora_html($languageLabels[$siteLanguage] ?? $siteLanguage) . '</p>';

    $body .= daitora_mail_section('お客様情報', daitora_mail_rows($data, $common, true));

    if (in_array($type, ['hire', 'corporate'], true)) {
        $transportPlanLabels = ['airport_only' => '空港送迎のみ', 'airport_charter' => '空港送迎＋日中貸切・観光', 'charter_only' => '日中貸切・観光のみ'];
        $data['transport_plan'] = $transportPlanLabels[daitora_field($data, 'transport_plan')] ?? daitora_field($data, 'transport_plan');
        if (daitora_field($data, 'flight_no_unknown') === 'yes') {
            $data['flight_no_unknown'] = '未定';
        }
        $transportPlan = daitora_field($data, 'transport_plan');
        $transportFields = ['transport_plan' => 'ご相談内容'];
        if ($transportPlan !== '日中貸切・観光のみ') {
            $transportFields += [
                'ride_date' => $transportPlan === '空港送迎＋日中貸切・観光' ? '空港送迎日' : '送迎日',
                'ride_time' => $transportPlan === '空港送迎＋日中貸切・観光' ? '空港配車時間' : '配車時間',
                'flight_no' => '便名', 'flight_no_unknown' => '便名未定',
                'flight_direction' => '便の区分', 'flight_time' => '便の予定時刻'
            ];
        }
        $transportFields += [
            'pickup' => '配車場所', 'destination' => '目的地', 'passengers' => 'ご乗車人数',
            'luggage_count' => '手荷物数', 'vehicle_type' => '車種', 'nationality' => 'お客様の国籍',
            'driver_language' => '希望するドライバー言語'
        ];
        $transportSectionTitle = $transportPlan === '日中貸切・観光のみ'
            ? '日中貸切・観光の基本情報'
            : '空港送迎の内容';
        $body .= daitora_mail_section($transportSectionTitle, daitora_mail_rows($data, $transportFields, true));
        if (in_array($transportPlan, ['空港送迎＋日中貸切・観光', '日中貸切・観光のみ'], true)) {
            $itineraryFields = [
                'itinerary_date' => '開始日', 'itinerary_start_time' => '開始時間',
                'itinerary_end_date' => '終了日', 'itinerary_end_time' => '終了時間',
                'itinerary_route' => '行程', 'itinerary_hotel' => '宿泊ホテル名（該当する場合）',
                'itinerary_duration' => '利用時間'
            ];
            $body .= daitora_mail_section('日中貸切・観光の行程', daitora_mail_rows($data, $itineraryFields, true));
        }
        $costFields = [
            'tax_status' => '消費税', 'toll_status' => '高速料金', 'parking_status' => '駐車場代',
            'driver_lodging' => 'ドライバー宿泊費', 'payment_timing' => 'お支払い方法',
            'ride_notes' => '送迎に関する備考'
        ];
        $body .= daitora_mail_section('料金・お支払い条件', daitora_mail_rows($data, $costFields, true));
    } else {
        $body .= daitora_mail_section('ご相談内容', daitora_mail_rows($data, $fieldsByType[$type] ?? [], true));
    }

    $meta = ['source_page' => '送信元ページ'];
    $data['submitted_at'] = date('Y-m-d H:i:s O', $submittedAt);
    $meta['submitted_at'] = '送信日時';
    $body .= daitora_mail_section('送信情報', daitora_mail_rows($data, $meta, true));
    $body .= '<p style="margin:24px 0 0;padding:14px;background:#fff8e8;color:#654d1c;font-size:13px">このメールはお問い合わせ受付通知です。予約、車両、料金、採用等の確定を意味しません。</p>'
        . '</div></div></body></html>';

    return ['subject' => $subject, 'body' => daitora_mail_plain_text($body), 'is_html' => false];
}

function daitora_group_mail_content(array $data, int $submittedAt, bool $staging): array
{
    if (daitora_field($data, 'type') !== 'japan_travel') {
        return daitora_mail_content($data, $submittedAt, $staging);
    }

    $languageLabels = [
        'ja' => '日语', 'en' => '英语', 'zh-CN' => '简体中文',
        'zh-cn' => '简体中文', 'ko' => '韩语', 'zh-TW' => '繁体中文',
        'zh-tw' => '繁体中文'
    ];
    $fieldLabels = [
        'name' => '姓名', 'email' => '电子邮箱', 'phone' => '电话号码',
        'contact_method' => '希望的联系方式', 'service_type' => '咨询服务',
        'travel_date' => '出行日期', 'travel_time' => '出行时间',
        'flight_number' => '航班号', 'pickup_location' => '上车地点',
        'dropoff_location' => '下车地点', 'passenger_count' => '乘客人数',
        'luggage_count' => '行李数量', 'vehicle_preference' => '车型偏好',
        'itinerary' => '行程与具体需求', 'message' => '咨询内容',
        'site_language' => '访客页面语言', 'source_page' => '提交页面',
        'landing_page' => '首次进入页面', 'source_site' => '来源网站',
        'source_channel' => '来源渠道', 'request_id' => '咨询编号',
        'ref_code' => '推荐码', 'utm_source' => 'UTM 来源',
        'utm_medium' => 'UTM 媒介', 'utm_campaign' => 'UTM 活动',
        'utm_content' => 'UTM 内容', 'visitor_id' => '访客编号'
    ];
    $date = daitora_field($data, 'travel_date') ?: '日期待确认';
    $subject = '[Japan Travel 咨询] ' . $date . '｜' . daitora_subject_piece(daitora_field($data, 'name'));
    if ($staging) {
        $subject = '[STAGING] ' . $subject;
    }
    $lines = [
        'Japan Travel 咨询通知',
        '',
        '重要提示：此邮件仅表示已收到客户咨询，尚未确认预约、车辆、费用或付款。',
        ''
    ];
    foreach ($fieldLabels as $name => $label) {
        $value = $name === 'site_language'
            ? ($languageLabels[daitora_field($data, $name)] ?? daitora_field($data, $name))
            : daitora_field($data, $name);
        if ($value !== '') {
            $lines[] = $label . ':';
            $lines[] = $value;
            $lines[] = '';
        }
    }
    $lines[] = '提交时间：' . date('Y-m-d H:i:s O', $submittedAt);
    $lines[] = '';
    $lines[] = '请直接回复此邮件联系客户；Reply-To 已设置为客户填写的邮箱。';
    return ['subject' => $subject, 'body' => implode("\n", $lines)];
}

function daitora_real_mail_sender(string $to, string $subject, string $body, string $replyTo, string $bcc = ''): bool
{
    if (!function_exists('mail')) {
        return false;
    }
    $isHtml = stripos(ltrim($body), '<!doctype html>') === 0;
    $mimeType = $isHtml ? 'text/html' : 'text/plain';
    $previousMimeType = ini_get('default_mimetype');
    $previousCharset = ini_get('default_charset');
    ini_set('default_mimetype', $mimeType);
    ini_set('default_charset', 'UTF-8');
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: ' . $mimeType . '; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        'From: Daitora Group Website <' . DAITORA_CONTACT_FROM . '>',
        'Reply-To: ' . $replyTo
    ];
    if ($bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL) && !preg_match('/[\r\n]/', $bcc)) {
        $headers[] = 'Bcc: ' . $bcc;
    }
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedBody = rtrim(chunk_split(base64_encode($body), 76, "\r\n"));
    $sent = mail($to, $encodedSubject, $encodedBody, implode("\r\n", $headers));
    if ($previousMimeType !== false) ini_set('default_mimetype', (string)$previousMimeType);
    if ($previousCharset !== false) ini_set('default_charset', (string)$previousCharset);
    return $sent;
}

function daitora_itinerary_duration(array $data): string
{
    $start = strtotime(daitora_field($data, 'itinerary_date') . ' ' . daitora_field($data, 'itinerary_start_time'));
    $end = strtotime(daitora_field($data, 'itinerary_end_date') . ' ' . daitora_field($data, 'itinerary_end_time'));
    if ($start === false || $end === false || $end <= $start) return '';
    $minutes = intdiv($end - $start, 60);
    $days = intdiv($minutes, 1440);
    $hours = intdiv($minutes % 1440, 60);
    $remainingMinutes = $minutes % 60;
    $parts = [];
    if ($days > 0) $parts[] = $days . '日';
    if ($hours > 0) $parts[] = $hours . '時間';
    if ($remainingMinutes > 0 || $parts === []) $parts[] = $remainingMinutes . '分';
    return implode(' ', $parts);
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

    $timestamp = $now ?? time();
    $requestHost = trim((string)($server['HTTP_HOST'] ?? ''));
    $signedServiceRequest = daitora_service_signature_is_valid($server, $rawBody, $timestamp);
    $allowMissingOrigin = defined('DAITORA_CONTACT_TEST') && DAITORA_CONTACT_TEST === true;
    if (!$signedServiceRequest && !daitora_origin_is_allowed(trim((string)($server['HTTP_ORIGIN'] ?? '')), $requestHost, $allowMissingOrigin)) {
        return daitora_json_result(403, ['success' => false, 'error' => 'invalid_origin']);
    }

    $parsed = daitora_parse_payload($contentType, $rawBody, $post);
    if (!$parsed['ok']) {
        return daitora_json_result($parsed['status'], ['success' => false, 'error' => $parsed['error']]);
    }

    $data = $parsed['data'];
    if (daitora_field($data, 'type') === 'japan_travel' && !$signedServiceRequest) {
        return daitora_json_result(403, ['success' => false, 'error' => 'service_auth_required']);
    }
    $validation = daitora_validate_payload($data);
    if (!$validation['ok']) {
        return daitora_json_result(422, ['success' => false, 'error' => $validation['error']]);
    }
    if (in_array(daitora_field($data, 'transport_plan'), ['airport_charter', 'charter_only'], true)) {
        $data['itinerary_duration'] = daitora_itinerary_duration($data);
    } else {
        unset($data['itinerary_duration']);
    }

    $fingerprintData = $data;
    unset($fingerprintData['website']);
    ksort($fingerprintData);
    $fingerprint = hash('sha256', (string)json_encode($fingerprintData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    $rateResult = $rateChecker
        ? (string)$rateChecker((string)($server['REMOTE_ADDR'] ?? ''), $fingerprint, $timestamp)
        : daitora_rate_limit(
            $signedServiceRequest ? 'service:japan-travel' : (string)($server['REMOTE_ADDR'] ?? ''),
            $fingerprint,
            $timestamp,
            $signedServiceRequest ? 30 : DAITORA_CONTACT_RATE_MAX
        );
    if ($rateResult === 'limited') {
        return daitora_json_result(429, ['success' => false, 'error' => 'rate_limited'], ['Retry-After' => '60']);
    }
    if ($rateResult !== 'ok') {
        return daitora_json_result(500, ['success' => false, 'error' => 'service_unavailable']);
    }

    $site = daitora_request_site($requestHost);
    $archiveId = '';
    if (!(defined('DAITORA_CONTACT_TEST') && DAITORA_CONTACT_TEST === true)) {
        try {
            $archiveId = daitora_contact_archive($data, $timestamp, $site);
        } catch (RuntimeException $exception) {
            error_log('Daitora contact archive failed: ' . $exception->getMessage());
            return daitora_json_result(500, ['success' => false, 'error' => 'archive_failed']);
        }
    }

    $mail = daitora_group_mail_content($data, $timestamp, $site === 'staging');
    $sender = $mailSender ?? 'daitora_real_mail_sender';
    $replyTo = daitora_field($data, 'email');
    $sent = (bool)$sender(
        daitora_contact_recipient(),
        $mail['subject'],
        $mail['body'],
        $replyTo,
        daitora_contact_backup_recipient()
    );
    if (!$sent) {
        if ($archiveId !== '') daitora_contact_set_delivery_status($archiveId, 'mail_failed');
        return daitora_json_result(500, ['success' => false, 'error' => 'mail_send_failed']);
    }

    if ($archiveId !== '') daitora_contact_set_delivery_status($archiveId, 'sent');

    $response = ['success' => true];
    if ($archiveId !== '') $response['inquiry_id'] = $archiveId;
    return daitora_json_result(200, $response);
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
