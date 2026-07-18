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

for (const unsafe of ['', 'http://example.com/contact', 'javascript:alert(1)', 'data:text/plain,x', 'file:///tmp/contact', 'https://user:pass@example.com/contact']) {
  assert.equal(core.resolveEndpoint(unsafe, 'https://daitora-jp.com/contact.html'), '');
}
assert.equal(
  core.resolveEndpoint('https://api.example.com/contact', 'https://daitora-jp.com/contact.html'),
  'https://api.example.com/contact'
);

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
  [response(204, '', null), true]
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
releaseFetch(response(204, '', null));
assert.deepEqual(await first, { ok: true, reason: 'success' });

console.log('Contact form fail-safe tests passed');
