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
  window.DAITORA_CONTACT_FORM_URL = "https://example.com/api/contact";
</script>
<script src="assets/js/site.js"></script>
```

The frontend sends JSON using `POST` with `Content-Type: application/json`.

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

When `window.DAITORA_CONTACT_FORM_URL` is not set, the submit button is disabled and the page shows a normal customer-facing notice asking users to contact by phone or email.

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
