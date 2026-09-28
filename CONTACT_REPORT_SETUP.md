# お問い合わせ統計・月次レポート設定

## 管理画面

- `https://daitora-jp.com/admin/contacts.php`
- ニュース管理画面と同じ管理者アカウントを使用します。
- 保存開始後の累計、月別・種類別件数、各お問い合わせの全項目を確認できます。

## 保存先

- 既定値は `data/contact-inquiries/` です。
- `data/.htaccess` によりブラウザーからの直接閲覧を禁止しています。
- サーバーで可能な場合は、`api/contact-config.php` の `DAITORA_CONTACT_DATA_DIR` に公開領域外の絶対パスを設定してください。

## 月次メール

毎月1日の早朝に、前月分を送るサーバーの定期実行を設定します。

```text
php /home/daitora/www/daitoraHP/api/send-contact-report.php
```

実際のPHPパスとサイト絶対パスは、さくらサーバーの環境に合わせて指定してください。宛先の既定値は `s_pang@daitora-jp.com` です。変更する場合は `api/contact-config.php` の `DAITORA_CONTACT_REPORT_TO` を設定します。

PHP CLIの定期実行が利用できない場合は、HTTPS経由でも実行できます。その場合は `DAITORA_CONTACT_REPORT_TOKEN` に十分長いランダム値を設定し、Authorization Bearerヘッダーを付けてPOSTしてください。トークンをURLには含めないでください。

## 過去データ

保存機能追加以前の相談はサイト内に記録がないため、自動復元できません。過去分を統計へ含めるには、受信メールボックスから対象メールをエクスポートして別途取り込みます。
