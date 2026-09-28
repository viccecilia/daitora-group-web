import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const core = require(path.join(ROOT, 'assets/js/contact-form-core.js'));

function response(status, contentType = 'application/json', body = {}) {
  return {
    status,
    headers: { get: (name) => name.toLowerCase() === 'content-type' ? contentType : '' },
    json: async () => body
  };
}

const contactHtml = fs.readFileSync(path.join(ROOT, 'contact.html'), 'utf8');
assert.match(contactHtml, /<form\b[^>]*data-contact-form[^>]*method="post"/i);
assert.doesNotMatch(contactHtml, /<form\b[^>]*data-contact-form[^>]*novalidate/i);
assert.match(contactHtml, /<fieldset\b[^>]*data-contact-fieldset[^>]*disabled/i);
assert.match(contactHtml, /<button\b[^>]*type="submit"[^>]*disabled[^>]*aria-disabled="true"/i);
assert.match(contactHtml, /<noscript>[\s\S]*オンラインフォームは現在ご利用いただけません/);
assert.match(contactHtml, /<form\b[^>]*data-submit-endpoint="\/api\/send-contact\.php"/i);
assert.match(contactHtml, /<input\b[^>]*name="website"[^>]*tabindex="-1"/i);
assert.match(contactHtml, /<select\b[^>]*name="transport_plan"[^>]*required/i);
assert.match(contactHtml, /data-itinerary-fields[^>]*hidden/i);
assert.match(contactHtml, /data-flight-fields[^>]*hidden/i);
assert.match(contactHtml, /data-ride-schedule-fields/i);
assert.match(contactHtml, /name="flight_no_unknown"/i);
assert.match(contactHtml, /<details class="form-wide form-cost-fields">/i);
assert.doesNotMatch(contactHtml, /<textarea name="message"[^>]*required/i);
assert.doesNotMatch(contactHtml, /name="ride_purpose"/i);
assert.match(contactHtml, /name="itinerary_end_date"[^>]*required/i);
assert.match(contactHtml, /name="itinerary_duration"[^>]*readonly/i);
assert.doesNotMatch(contactHtml, /name="estimated_amount"/i);
assert.match(contactHtml, /name="tax_status"/i);
assert.match(contactHtml, /name="payment_timing"/i);
const pickupPosition = contactHtml.indexOf('name="pickup"');
const driverLanguagePosition = contactHtml.indexOf('name="driver_language"');
const itineraryPosition = contactHtml.indexOf('data-itinerary-fields');
const costPosition = contactHtml.indexOf('form-cost-fields');
assert.ok(
  pickupPosition < driverLanguagePosition && driverLanguagePosition < itineraryPosition && itineraryPosition < costPosition,
  'Airport-transfer fields must appear before charter fields, followed by payment fields'
);

const siteJs = fs.readFileSync(path.join(ROOT, 'assets/js/site.js'), 'utf8');
assert.match(siteJs, /contactForm\.dataset\.submitEndpoint\s*\|\|\s*window\.DAITORA_CONTACT_FORM_URL/);
assert.match(siteJs, /payload\.source_page\s*=\s*location\.href/);
assert.match(siteJs, /const showFlight = isTransportType && \['airport_only', 'airport_charter'\]/);
assert.match(siteJs, /const showRideSchedule = isTransportType && plan !== 'charter_only'/);
assert.match(siteJs, /const updateItineraryDuration = \(\) =>/);

const contactApi = fs.readFileSync(path.join(ROOT, 'api/send-contact.php'), 'utf8');
assert.match(contactApi, /function daitora_mail_plain_text\(string \$html\): string/);
assert.match(contactApi, /'body' => daitora_mail_plain_text\(\$body\), 'is_html' => false/);
assert.match(contactApi, /return '■ ' \. trim\(\$label\) \. '：'/);
assert.match(contactApi, /\$mimeType = \$isHtml \? 'text\/html' : 'text\/plain'/);
assert.match(contactApi, /ini_set\('default_mimetype', \$mimeType\)/);
assert.match(contactApi, /Content-Type: ' \. \$mimeType \. '; charset=UTF-8'/);
assert.match(contactApi, /Content-Transfer-Encoding: base64/);
assert.match(contactApi, /chunk_split\(base64_encode\(\$body\), 76, "\\r\\n"\)/);
assert.match(contactApi, /\$sent = mail\(\$to, \$encodedSubject, \$encodedBody/);
assert.doesNotMatch(contactApi, /return mb_send_mail\(/);
assert.match(contactApi, /\? '日中貸切・観光の基本情報'/);
assert.match(contactApi, /: '空港送迎の内容'/);
assert.ok(
  contactApi.indexOf("daitora_mail_section($transportSectionTitle") < contactApi.indexOf("daitora_mail_section('日中貸切・観光の行程'"),
  'Email must list transfer/basic information before the charter itinerary'
);

for (const unsafe of ['', 'http://example.com/contact', 'javascript:alert(1)', 'data:text/plain,x', 'file:///tmp/contact', 'https://user:pass@example.com/contact']) {
  assert.equal(core.resolveEndpoint(unsafe, 'https://daitora-jp.com/contact.html'), '');
}
assert.equal(
  core.resolveEndpoint('https://api.example.com/contact', 'https://daitora-jp.com/contact.html'),
  'https://api.example.com/contact'
);
assert.equal(
  core.resolveEndpoint('/api/send-contact.php', 'https://daitora-jp.com/contact.html'),
  'https://daitora-jp.com/api/send-contact.php'
);
assert.equal(
  core.resolveEndpoint('/api/send-contact.php', 'https://www.taxi-airport.jp/daitora-preview/contact.html'),
  'https://www.taxi-airport.jp/api/send-contact.php'
);
assert.equal(core.resolveEndpoint('/api/send-contact.php', 'http://127.0.0.1:8788/contact.html'), '');
assert.equal(core.resolveEndpoint('/api/send-contact.php', 'file:///C:/site/contact.html'), '');

let fetchCalls = 0;
const unavailableSubmit = core.createSubmitter(async () => {
  fetchCalls += 1;
  return response(204);
});
assert.deepEqual(await unavailableSubmit({ endpoint: '', baseUrl: 'https://daitora-jp.com/', payload: {} }), { ok: false, reason: 'unavailable' });
assert.deepEqual(await unavailableSubmit({ endpoint: 'http://example.com', baseUrl: 'https://daitora-jp.com/', payload: {} }), { ok: false, reason: 'unavailable' });
assert.equal(fetchCalls, 0, 'An invalid or missing endpoint must never call fetch');

const cases = [
  [response(500), false],
  [response(200, 'text/html', {}), false],
  [response(200, 'application/json', { success: false }), false],
  [response(200, 'application/json', { success: true }), true],
  [response(201, 'application/problem+json', { success: true }), true],
  [response(204, '', null), false]
];

for (const [fakeResponse, expected] of cases) {
  const submit = core.createSubmitter(async () => fakeResponse);
  const result = await submit({ endpoint: 'https://api.example.com/contact', baseUrl: 'https://daitora-jp.com/', payload: { test: true } });
  assert.equal(result.ok, expected, `Unexpected result for HTTP ${fakeResponse.status}`);
}

const networkSubmit = core.createSubmitter(async () => { throw new TypeError('network'); });
assert.deepEqual(
  await networkSubmit({ endpoint: 'https://api.example.com/contact', baseUrl: 'https://daitora-jp.com/', payload: {} }),
  { ok: false, reason: 'network' }
);

const timeoutSubmit = core.createSubmitter((_url, options) => new Promise((_resolve, reject) => {
  options.signal.addEventListener('abort', () => {
    const error = new Error('aborted');
    error.name = 'AbortError';
    reject(error);
  }, { once: true });
}));
assert.deepEqual(
  await timeoutSubmit({ endpoint: 'https://api.example.com/contact', baseUrl: 'https://daitora-jp.com/', payload: {}, timeoutMs: 5 }),
  { ok: false, reason: 'timeout' }
);

let releaseFetch;
const duplicateSubmit = core.createSubmitter(() => new Promise((resolve) => { releaseFetch = resolve; }));
const first = duplicateSubmit({ endpoint: 'https://api.example.com/contact', baseUrl: 'https://daitora-jp.com/', payload: {} });
assert.deepEqual(
  await duplicateSubmit({ endpoint: 'https://api.example.com/contact', baseUrl: 'https://daitora-jp.com/', payload: {} }),
  { ok: false, reason: 'duplicate' }
);
releaseFetch(response(200, 'application/json', { success: true }));
assert.deepEqual(await first, { ok: true, reason: 'success' });

console.log('Contact form fail-safe tests passed');
