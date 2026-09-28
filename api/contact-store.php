<?php
declare(strict_types=1);

function daitora_contact_data_directory(): string
{
    $configured = getenv('DAITORA_CONTACT_DATA_DIR');
    if ($configured === false || trim((string)$configured) === '') {
        $configFile = __DIR__ . '/contact-config.php';
        $values = is_file($configFile) ? require $configFile : [];
        $configured = is_array($values) ? (string)($values['DAITORA_CONTACT_DATA_DIR'] ?? '') : '';
    }
    $configured = trim((string)$configured);
    return $configured !== '' ? rtrim($configured, '/\\') : dirname(__DIR__) . '/data/contact-inquiries';
}

function daitora_contact_public_fields(array $data): array
{
    $excluded = ['website', 'privacy'];
    $clean = [];
    foreach ($data as $key => $value) {
        if (!is_string($key) || in_array($key, $excluded, true) || !is_scalar($value)) continue;
        $clean[$key] = trim((string)$value);
    }
    return $clean;
}

function daitora_contact_archive(array $data, int $submittedAt, string $site): string
{
    $directory = daitora_contact_data_directory();
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('お問い合わせ保存先を作成できません。');
    }
    $id = date('Ymd-His', $submittedAt) . '-' . bin2hex(random_bytes(6));
    $record = [
        'id' => $id,
        'submitted_at' => date(DATE_ATOM, $submittedAt),
        'site' => $site,
        'delivery_status' => 'pending',
        'data' => daitora_contact_public_fields($data),
    ];
    daitora_contact_write_record($record);
    return $id;
}

function daitora_contact_write_record(array $record): void
{
    $id = preg_replace('/[^a-zA-Z0-9_-]/', '', (string)($record['id'] ?? ''));
    if ($id === '') throw new RuntimeException('お問い合わせ番号が不正です。');
    $directory = daitora_contact_data_directory();
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('お問い合わせ保存先を作成できません。');
    }
    $json = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) throw new RuntimeException('お問い合わせデータを変換できません。');
    $file = $directory . DIRECTORY_SEPARATOR . $id . '.json';
    $temp = $file . '.tmp-' . bin2hex(random_bytes(4));
    if (file_put_contents($temp, $json . PHP_EOL, LOCK_EX) === false || !rename($temp, $file)) {
        @unlink($temp);
        throw new RuntimeException('お問い合わせデータを保存できません。');
    }
    @chmod($file, 0600);
}

function daitora_contact_set_delivery_status(string $id, string $status): void
{
    $id = preg_replace('/[^a-zA-Z0-9_-]/', '', $id);
    $file = daitora_contact_data_directory() . DIRECTORY_SEPARATOR . $id . '.json';
    if ($id === '' || !is_file($file)) return;
    $record = json_decode((string)file_get_contents($file), true);
    if (!is_array($record)) return;
    $record['delivery_status'] = $status;
    daitora_contact_write_record($record);
}

function daitora_contact_records(): array
{
    $directory = daitora_contact_data_directory();
    if (!is_dir($directory)) return [];
    $records = [];
    foreach (glob($directory . DIRECTORY_SEPARATOR . '*.json') ?: [] as $file) {
        $decoded = json_decode((string)file_get_contents($file), true);
        if (is_array($decoded) && isset($decoded['id'], $decoded['submitted_at'], $decoded['data']) && is_array($decoded['data'])) {
            $records[] = $decoded;
        }
    }
    usort($records, static fn(array $a, array $b): int => strcmp((string)$b['submitted_at'], (string)$a['submitted_at']));
    return $records;
}

function daitora_contact_type_labels(): array
{
    return [
        'hire' => 'ハイヤー・空港送迎', 'taxi' => 'タクシー利用',
        'auto' => '中古車販売・ローン相談', 'corporate' => '法人・旅行会社・ホテル様',
        'recruit' => '採用・乗務員応募', 'general' => 'その他', 'japan_travel' => 'Japan Travel',
    ];
}

function daitora_contact_field_labels(): array
{
    return [
        'type'=>'種類','name'=>'お名前','company'=>'会社・団体名','email'=>'メール','phone'=>'電話番号','language'=>'希望言語','message'=>'お問い合わせ内容',
        'transport_plan'=>'ご相談内容','ride_date'=>'ご利用日','ride_time'=>'配車時間','flight_no'=>'便名','flight_direction'=>'便の区分','flight_time'=>'便の予定時刻',
        'pickup'=>'配車場所','destination'=>'目的地','passengers'=>'乗車人数','luggage_count'=>'手荷物数','vehicle_type'=>'車種','nationality'=>'国籍','driver_language'=>'ドライバー言語','ride_purpose'=>'用途','ride_notes'=>'送迎備考',
        'itinerary_date'=>'貸切日','itinerary_start_time'=>'開始時間','itinerary_end_time'=>'終了時間','itinerary_route'=>'行程','itinerary_hotel'=>'ホテル名','itinerary_duration'=>'利用時間','estimated_amount'=>'予算・見積金額',
        'tax_status'=>'消費税','toll_status'=>'高速料金','parking_status'=>'駐車場代','driver_lodging'=>'ドライバー宿泊費','payment_timing'=>'支払方法',
        'taxi_area'=>'利用予定エリア','taxi_time'=>'利用予定日時','taxi_pickup'=>'乗車地','taxi_destination'=>'目的地','taxi_notes'=>'タクシー備考',
        'auto_model'=>'希望車種','auto_purpose'=>'利用目的','applicant_type'=>'申込区分','loan_interest'=>'ローン相談','auto_notes'=>'購入備考',
        'recruit_role'=>'希望職種','work_area'=>'勤務希望エリア','experience'=>'経験','contact_time'=>'連絡可能時間','recruit_notes'=>'採用備考','general_subject'=>'件名',
        'service_type'=>'相談サービス','travel_date'=>'出行日','travel_time'=>'出行時間','flight_number'=>'航班号','pickup_location'=>'上车地点','dropoff_location'=>'下车地点','passenger_count'=>'乘客人数','vehicle_preference'=>'车型偏好','itinerary'=>'行程',
        'site_language'=>'表示言語','source_page'=>'送信元ページ','source_site'=>'送信元サイト','source_channel'=>'流入経路','request_id'=>'外部相談番号','landing_page'=>'ランディングページ','ref_code'=>'紹介コード','utm_source'=>'UTM source','utm_medium'=>'UTM medium','utm_campaign'=>'UTM campaign','utm_content'=>'UTM content','visitor_id'=>'訪問者番号',
    ];
}

function daitora_contact_month(string $date): string
{
    return preg_match('/^\d{4}-\d{2}/', $date, $match) ? $match[0] : '';
}
