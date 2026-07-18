# Daitora Group Website

Static corporate website for Daitora Group.

## Local Preview

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

## Contact Form Integration

The contact form in `contact.html` is frontend-ready but intentionally has no backend endpoint configured yet.

To enable real submission, define the endpoint before `assets/js/site.js` is loaded:

```html
<script>
  window.DAITORA_CONTACT_FORM_URL = "https://YOUR-API-HOST/CONTACT-PATH";
</script>
<script src="assets/js/contact-form-core.js"></script>
<script src="assets/js/site.js"></script>
```

The placeholder above is not a working service and must never be deployed as-is. The frontend accepts only a valid HTTPS endpoint without embedded credentials. It sends JSON using `POST` with `Content-Type: application/json`.

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

## Current Sample Mode

When `window.DAITORA_CONTACT_FORM_URL` is not set or is not a valid HTTPS URL, the form controls and submit button remain disabled and the page shows a normal customer-facing notice asking users to contact by phone or email. No request is made and no success state is shown.

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
