<?php
declare(strict_types=1);

require_once __DIR__ . '/contact-store.php';

function daitora_contact_report_recipient(): string
{
    $email = function_exists('daitora_env') ? daitora_env('DAITORA_CONTACT_REPORT_TO', 's_pang@daitora-jp.com') : 's_pang@daitora-jp.com';
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : 's_pang@daitora-jp.com';
}

function daitora_contact_report_content(string $month, array $records, int $cumulativeTotal): array
{
    $typeLabels = daitora_contact_type_labels(); $fieldLabels = daitora_contact_field_labels(); $counts = [];
    foreach($records as $record){$type=(string)($record['data']['type']??'general');$counts[$type]=($counts[$type]??0)+1;}
    $h=static fn(string $v):string=>htmlspecialchars($v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');
    $body='<!doctype html><html lang="ja"><body style="font-family:Arial,Meiryo,sans-serif;color:#23364b"><div style="max-width:820px;margin:auto">'
        .'<h1 style="color:#113764">'.$h($month).' お問い合わせ月次レポート</h1><p>保存開始後の累計：<strong>'.$cumulativeTotal.'件</strong>　／　当月合計：<strong>'.count($records).'件</strong></p><table style="border-collapse:collapse;width:100%">';
    foreach($counts as $type=>$count)$body.='<tr><th style="padding:8px;border:1px solid #ccd5df;text-align:left">'.$h($typeLabels[$type]??$type).'</th><td style="padding:8px;border:1px solid #ccd5df">'.$count.'件</td></tr>';
    $body.='</table><h2 style="color:#113764">具体的なお問い合わせ内容</h2>';
    foreach($records as $record){$data=$record['data'];$type=(string)($data['type']??'general');$body.='<section style="margin:20px 0;padding:16px;border:1px solid #ccd5df"><h3 style="margin-top:0;color:#113764">'.$h((string)$record['submitted_at']).'｜'.$h($typeLabels[$type]??$type).'｜'.$h((string)($data['name']??'')).'</h3><table style="border-collapse:collapse;width:100%">';foreach($data as $key=>$value){if($value==='')continue;$body.='<tr><th style="width:30%;padding:7px;border:1px solid #dde3ea;background:#f5f7fa;text-align:left;vertical-align:top">'.$h($fieldLabels[$key]??$key).'</th><td style="padding:7px;border:1px solid #dde3ea;vertical-align:top">'.nl2br($h((string)$value)).'</td></tr>';}$body.='</table></section>';}
    $body.='</div></body></html>';
    return ['subject'=>'[DAITORA] '.$month.' お問い合わせ月次レポート（'.count($records).'件）','body'=>$body];
}

function daitora_send_contact_report(string $month): bool
{
    $allRecords=daitora_contact_records();
    $records=array_values(array_filter($allRecords,static fn(array $r):bool=>daitora_contact_month((string)$r['submitted_at'])===$month));
    $mail=daitora_contact_report_content($month,$records,count($allRecords));
    if(!function_exists('mb_send_mail'))return false;
    mb_language('Japanese');mb_internal_encoding('UTF-8');
    $headers=['MIME-Version: 1.0','Content-Type: text/html; charset=UTF-8','Content-Transfer-Encoding: 8bit','From: Daitora Group Website <no-reply@daitora-jp.com>'];
    return mb_send_mail(daitora_contact_report_recipient(),$mail['subject'],$mail['body'],implode("\r\n",$headers));
}
