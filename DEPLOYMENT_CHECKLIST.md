# Daitora Group Deployment Checklist

## Current Release State

- 本サイトは静的 HTML と共通アセットで構成されています。
- 日本語はルート、英語は `/en/`、簡体字中国語は `/zh-cn/`、韓国語は `/ko/`、繁体字中国語は `/zh-tw/` です。
- お問い合わせフォームの正式な受付 API は、現在このリポジトリには設定されていません。
- API 未設定時は送信ボタンを無効化し、電話またはメールでの連絡案内を表示します。成功表示は行いません。
- `/autoloan/` は別の正式申込フローです。このサイトの公開作業では変更しません。

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
- サーバー側で管理される `/autoloan/`

## Do Not Publish

次の制作・監査・内部確認用ファイルは公開ディレクトリから除外してください。

- `.git/`, `node_modules/`
- `scripts/`
- `output/` と `output/playwright/`
- `daitora-group-review-sample/`
- `media_audit/`, `daitora_ppt_extract/`
- `*.pptx`, `*.zip`
- `TRANSLATION_REVIEW.md`, `MULTILINGUAL_QA.md`, `CONTENT_VERIFICATION.md`
- その他の内部資料、ログ、キャッシュ、未使用素材
- HTML から参照されていない `assets/videos/curated/` と `assets/videos/selected/` の動画

## Contact Form API

正式受付 API が決まるまでは、`window.DAITORA_CONTACT_FORM_URL` を設定しないでください。未設定状態が現在の安全な本番挙動です。

正式 API を接続する場合は、`assets/js/site.js` より前に、公開環境の設定ファイルまたはサーバー出力から URL を設定します。秘密鍵や API Token はブラウザーへ出力しないでください。

```html
<script>
  window.DAITORA_CONTACT_FORM_URL = "https://daitora-jp.com/api/contact";
</script>
<script src="assets/js/site.js"></script>
```

上記 URL はインターフェース例です。正式な API が確定するまで、そのまま使用しないでください。

フロントエンドは `Content-Type: application/json` の `POST` を送信し、HTTP 2xx のときだけ成功表示を行います。主な項目は次のとおりです。

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
6. HTTPS、Origin / CORS、CSRF、レート制限、スパム対策を実装すること。
7. 個人情報の保存期間、閲覧権限、削除手順、障害時ログを定めること。
8. 成功時は 2xx、入力エラーは 4xx、サーバー障害は 5xx を返すこと。
9. 多言語の受付確認メールは、受信した `site_language` に基づいて送信すること。

## Multilingual Preflight

```powershell
node --check scripts/build-i18n.mjs
node --check scripts/audit-i18n.mjs
node --check assets/js/site.js
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
- フォーム API 未設定時に送信ボタンが無効で、成功表示が出ないこと。
- 会社情報、約100台、拠点、許認可、G20 / EXPO / ブランド案件、ニュース日付を事業責任者が確認すること。
- 公開ディレクトリに内部資料、監査画像、未使用動画、秘密情報が含まれていないこと。
