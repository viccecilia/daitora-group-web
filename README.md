# Daitora Group Website

Static corporate website for Daitora Group.

## Local Preview

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

## Contact Form Integration

The Daitora Group forms submit to the same-origin endpoint at `/api/send-contact.php`. The endpoint sends all validated inquiries to `DAITORA_CONTACT_TO` (currently `pangvic9@gmail.com` by default) with the validated visitor email as `Reply-To`.

Japan Travel uses the same group mail channel through a server-to-server request. Configure the same strong `DAITORA_CONTACT_SHARED_SECRET` value on both servers. The signature is an HMAC-SHA256 of the Unix timestamp, a newline, and the exact JSON body. The secret must never be exposed to browser JavaScript or committed to Git.

A submission is shown as successful only when the API returns either:

- HTTP `204` with no response body; or
- another HTTP `2xx` response with JSON content type and `{ "success": true }`.

An HTML error page, malformed JSON, `{ "success": false }`, non-2xx status, timeout, or network error is never shown as successful. Requests time out after 15 seconds and duplicate in-flight submissions are rejected.

Example payload:

```json
{
  "type": "hire",
  "name": "Customer Name",
  "company": "Company Name",
  "email": "customer@example.com",
  "phone": "09000000000",
  "language": "日本語",
  "ride_date": "2026-07-20",
  "ride_time": "10:00",
  "pickup": "KIX",
  "destination": "Kyoto Hotel",
  "flight_no": "JL000",
  "passengers": "2",
  "luggage_count": "2",
  "vehicle_type": "Alphard",
  "ride_purpose": "空港送迎",
  "message": "Inquiry body",
  "privacy": "on"
}
```

## Required Server-Side Validation

Do not trust frontend validation alone. The server must verify:

- `type` is one of `hire`, `taxi`, `auto`, `corporate`, `recruit`, `general`.
- `name`, `email`, `message`, and privacy consent are present.
- Email format and phone format are reasonable.
- Only fields relevant to the selected `type` are accepted.
- Input length limits are enforced.
- HTML/script content is escaped or rejected.
- Spam/rate limiting is applied.
- Notification emails must not expose raw unescaped user input.
- Personal data must be stored only for the necessary period.

## Production Mail Gate

Code and automated endpoint tests do not prove real delivery. Before public release, submit one approved staging inquiry, confirm receipt at `info@daitora-jp.com`, verify `Reply-To`, and then repeat on the production host.

## Multilingual Static Build

The site uses the Japanese root pages as the source and generates static localized pages with:

```bash
node scripts/build-i18n.mjs
```

Generated language directories:

- `/zh-cn/` Simplified Chinese
- `/en/` English
- `/ko/` Korean
- `/zh-tw/` Traditional Chinese

The build also updates:

- language switcher links
- page-level SEO metadata
- canonical and hreflang tags
- `sitemap.xml`
- contact form hidden `site_language`

Language switching is static-page based. It does not use query parameters and does not force automatic redirects.

Before publishing, review `MULTILINGUAL_QA.md` and confirm all translated copy with native speakers and the business owner.

## Local Quality Checks

```bash
node --check scripts/build-i18n.mjs
node --check scripts/audit-i18n.mjs
node --check assets/js/site.js
node scripts/test-contact-form.mjs
node scripts/test-audit-negative.mjs
node scripts/build-i18n.mjs
node scripts/audit-i18n.mjs
```

The same checks run in `.github/workflows/site-qa.yml`. Automated language and markup checks do not replace native-language, legal, or business-fact approval.

## News Management

The public news list is loaded from `/api/news.php`, with the existing static markup retained as a resilient fallback. The management screen is `/admin/news.php`.

Production setup:

1. Copy `api/news-config.example.php` to `api/news-config.php` on the server.
2. Set a unique username and a password of at least 16 characters in that file, or set `DAITORA_NEWS_ADMIN_USERNAME` and `DAITORA_NEWS_ADMIN_PASSWORD` in the server environment.
3. Ensure the PHP process can write to `data/news.json`, `data/`, and `assets/uploads/news/`.
4. Open `/admin/news.php`, log in, and manage publication state, the five language fields, and the main image. Uploaded JPEG, PNG, and WebP files are center-cropped and converted to a consistent 1600×900 JPEG. Public typography and spacing are controlled by the site stylesheet rather than the editor.

`api/news-config.php` is ignored by Git and must not be included in public archives.

## Official SNS links

Official social links are managed centrally in `scripts/sns-config.json`. YouTube, Facebook, WeChat and RED (Xiaohongshu) are reserved there and hidden by default. To publish an account, add its full HTTPS URL, set `enabled` to `true`, and run the multilingual build. The footer on every language page will be updated automatically.
