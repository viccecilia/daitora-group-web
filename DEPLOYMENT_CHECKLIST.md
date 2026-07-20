# Daitora Group Deployment Checklist

## Current Release State

- 本サイトは静的 HTML と共通アセットで構成されています。
- 日本語はルート、英語は `/en/`、簡体字中国語は `/zh-cn/`、韓国語は `/ko/`、繁体字中国語は `/zh-tw/` です。
- お問い合わせフォームは、同一オリジンの `/api/send-contact.php` を使用します。
- `file://`、ローカル HTTP、または endpoint が利用できない環境では送信ボタンを無効化し、電話またはメールでの連絡案内を表示します。成功表示は行いません。
- `https://www.daitora-jp.com/autoloan/` は別の正式申込フローです。このサイトの公開作業では変更・複製しません。

## Publish Scope

公開ディレクトリには、実際に参照される次のファイルだけを配置してください。

- ルートの公開用 `*.html`
- `en/`, `zh-cn/`, `ko/`, `zh-tw/` の生成済み公開用 `*.html`
- `assets/css/`
- `assets/js/`
- HTML と CSS から参照される `assets/images/` と `assets/thumbs/`
- Hero で実際に参照される動画と poster
- `robots.txt`
- `sitemap.xml`
- favicon 関連ファイル
- `api/send-contact.php`
- サーバー側で管理される `/autoloan/`

## Do Not Publish

次の制作・監査・内部確認用ファイルは公開ディレクトリから除外してください。

- `.git/`, `node_modules/`
- `scripts/`
- `GEO_*.html`、`GEO_*.md` などの内部進捗資料
- `output/` と `output/playwright/`
- `daitora-group-review-sample/`
- `media_audit/`, `daitora_ppt_extract/`
- `*.pptx`, `*.zip`
- `TRANSLATION_REVIEW.md`, `MULTILINGUAL_QA.md`, `CONTENT_VERIFICATION.md`
- その他の内部資料、ログ、キャッシュ、未使用素材
- HTML から参照されていない `assets/videos/curated/` と `assets/videos/selected/` の動画

## Contact Form API

公開フォームは `<form data-submit-endpoint="/api/send-contact.php">` を使用します。正式サイトでは `https://www.daitora-jp.com/api/send-contact.php`、プレビューでは `https://www.taxi-airport.jp/api/send-contact.php` に同一オリジンで解決されます。例外的に別 endpoint が必要な場合だけ、`window.DAITORA_CONTACT_FORM_URL` をフォールバックとして利用できます。秘密鍵、SMTP パスワード、API Token はブラウザーへ出力しないでください。

フロントエンドは `Content-Type: application/json` の `POST` を送信します。成功表示の条件は、JSON content type の HTTP 2xx と `{ "success": true }` の組み合わせだけです。HTTP `204`、HTML、壊れた JSON、`success:false`、非 2xx、タイムアウト、ネットワーク異常は成功扱いにしません。主な項目は次のとおりです。

- 共通: `type`, `name`, `company`, `email`, `phone`, `site_language`, `privacy`
- Hire / Corporate: `ride_date`, `ride_time`, `pickup`, `destination`, `flight_no`, `passengers`, `luggage_count`, `vehicle_type`, `ride_purpose`, `message`
- Taxi: タクシー利用に必要な日時、乗降地、人数、連絡事項
- Auto: 希望車種、利用目的、購入希望時期、申込区分、ローン相談、連絡事項
- Recruit: 希望職種、経験、連絡事項
- General: 問い合わせ本文

サーバー側では必ず次を検証してください。

1. `type` が `hire`, `taxi`, `auto`, `corporate`, `recruit`, `general` のいずれかであること。
2. 選択した種類に対応する必須項目だけを受け付けること。
3. 氏名、メール、電話、文字数、日付、数値、`site_language` を検証すること。
4. プライバシーポリシーへの同意を検証すること。
5. HTML とスクリプトを無害化し、通知メールへ未処理の入力を挿入しないこと。
6. HTTPS、Origin、レート制限、重複送信防止、honeypot によるスパム対策を維持すること。
7. 個人情報の保存期間、閲覧権限、削除手順、障害時ログを定めること。
8. 成功時は JSON content type の 2xx と `{ "success": true }` を返すこと。入力エラーは 4xx、サーバー障害は 5xx を返すこと。
9. 現在の PHP endpoint は社内通知メールだけを送信します。顧客向け自動返信を追加する場合は、受信した `site_language` に基づく五言語テンプレートを法務・事業確認後に実装すること。

Origin はリクエスト Host ごとの同一サイトに限定します。`daitora-jp.com` / `www.daitora-jp.com` では Daitora の HTTPS Origin だけを、`taxi-airport.jp` / `www.taxi-airport.jp` では Taxi Airport の HTTPS Origin だけを許可します。異なるサイトの組み合わせ、HTTP Origin、未知の Host / Origin、非標準ポートは拒否します。Origin 欠落はテスト定数を有効にした非ブラウザー自動試験だけで許可し、本番リクエストでは拒否します。CORS ワイルドカードは使用しません。

Taxi Airport Host から受け付けた通知件名には `[STAGING]` を付けます。Daitora Host の正式通知件名には付けません。公開前に両環境で件名、Reply-To、実受信を確認してください。

### Hosting Requirements

- PHP 7.4 以上または互換性のある PHP 8.x。
- `mbstring` 拡張と `mb_send_mail()`。
- PHP が使用する一時ディレクトリへの書き込み権限（IP をハッシュ化したレート制限データのみを保存）。
- `no-reply@daitora-jp.com` から `info@daitora-jp.com` へ送信できるメール配送設定。
- `daitora-jp.com` の SPF、DKIM、DMARC を設定し、送信元整合性と迷惑メール判定を確認。
- PHP ソースがテキストとして配信されず、サーバー上で実行される設定。

### Server Verification

1. `php scripts/test-contact-endpoint.php` を実行し、入力検証、Host-aware Origin、ステージング件名、honeypot、レート制限、メール失敗時の 500 を確認します。
2. ステージングの HTTPS URL から各問い合わせ種別を送信し、`info@daitora-jp.com` で実メールを受信します。
3. Reply-To が検証済みの顧客メールになり、From が必ず `no-reply@daitora-jp.com` であることを確認します。
4. 同一内容の連続送信、上限超過、無効メール、必須項目欠落が成功表示にならないことを確認します。
5. Web サーバーログに本文や個人情報を不用意に記録しないことを確認します。

## Multilingual Preflight

```powershell
node --check scripts/build-i18n.mjs
node --check scripts/audit-i18n.mjs
node --check scripts/i18n-config.mjs
node --check assets/js/site.js
node --check assets/js/contact-form-core.js
node scripts/test-contact-form.mjs
node scripts/test-audit-negative.mjs
php scripts/test-contact-endpoint.php
node scripts/build-i18n.mjs
node scripts/audit-i18n.mjs
```

公開前に `MULTILINGUAL_QA.md` が `PASSED` であり、各言語のエラー数が 0 であることを確認してください。機械監査の合格は母語話者または事業責任者による承認を意味しません。

## SEO And Routes

- canonical は `https://daitora-jp.com/` を基準とします。
- 各正式ページに `ja`, `zh-CN`, `en`, `ko`, `zh-TW`, `x-default` の hreflang が必要です。
- `company.html` は各言語の `about.html#company-profile` へ案内し、canonical にはアンカーを含めません。
- `robots.txt` の Sitemap URL と `sitemap.xml` の公開 URL が一致していることを確認します。
- `sitemap.xml` に `company.html` の案内ページを含めません。
- OG 画像、Twitter Card、favicon が公開 URL から取得できることを確認します。

## Media

- 現在の Hero は poster と、HTML の `data-desktop-videos` / `data-mobile-videos` から参照される動画だけを必要とします。
- `assets/videos/` 全体を公開しないでください。
- 動画はページ非表示時に停止し、`prefers-reduced-motion` では poster に降格します。
- 公開前に実ファイル容量とレスポンスヘッダーを確認し、MP4 / WebM と画像に長期キャッシュを設定します。

## Final Manual Checks

- 320, 390, 768, 1024, 1440px で横方向のはみ出しがないこと。
- Header、言語切替、モバイルメニュー、CTA、フォームラベルが重ならないこと。
- `tel:` と `mailto:` が実機で動作すること。
- `file://` とローカル HTTP では送信ボタンが無効で、成功表示が出ないこと。
- 本番 HTTPS では PHP endpoint の実メール受信、Reply-To、エラー状態を確認すること。
- 会社情報、約100台、拠点、許認可、G20 / EXPO / ブランド案件、ニュース日付を事業責任者が確認すること。
- 公開ディレクトリに内部資料、監査画像、未使用動画、秘密情報が含まれていないこと。

## Production Release Gates

- **BLOCKER:** `/api/send-contact.php` is implemented, but real delivery from the production PHP host has not yet been verified. Do not advertise the form as available until a test message is received at `info@daitora-jp.com` and Reply-To behavior is confirmed.
- The frontend aborts a stalled contact request after 15 seconds and shows the localized network-failure message. The server should return within that window or provide an agreed timeout policy.
- Confirm PHP, `mbstring`, outbound mail, writable temporary storage, SPF, DKIM and DMARC on the production host.
- Confirm the privacy-policy legal wording and the retention/deletion policy before collecting personal information.
- Obtain business approval for vehicle count, addresses, office coverage, licences, cases, and news dates.
- Obtain native-language approval; `MACHINE_POLISHED` and automated `PASSED` states are not human approval.
- Set and verify HTTPS redirect, HSTS, CSP, frame protection, compression, and long-lived cache headers on the deployment host.
- Publish a curated file set. Do not upload `scripts/`, `output/`, source-review documents, ignored video libraries, or unreferenced source images.
