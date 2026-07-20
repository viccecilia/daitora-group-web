import assert from 'node:assert/strict';
import { expectedHreflangMap, findBlockedWording, validateExactAlternates, validateJapanTravelEntry } from './audit-i18n.mjs';

const expected = expectedHreflangMap('contact.html');
const valid = Object.entries(expected).map(([code, href]) => ({ code, href }));
assert.deepEqual(validateExactAlternates(valid, expected), []);

const wrongHref = valid.map((entry) => ({ ...entry }));
wrongHref.find((entry) => entry.code === 'ko').href = 'https://daitora-jp.com/ko/index.html';
assert.ok(validateExactAlternates(wrongHref, expected).some((failure) => failure.includes('ko expected')));

const missing = valid.filter((entry) => entry.code !== 'zh-TW');
assert.ok(validateExactAlternates(missing, expected).some((failure) => failure.includes('zh-TW count is 0')));

const duplicate = [...valid, { ...valid[0] }];
assert.ok(validateExactAlternates(duplicate, expected).some((failure) => failure.includes('ja count is 2')));

assert.equal(findBlockedWording('zh-CN', ['交通兼容']).length, 1);
assert.equal(findBlockedWording('zh-TW', ['我體驗到了']).length, 1);
assert.equal(findBlockedWording('en', ['Privacy policyand agree to be contacted.']).length, 1);
assert.equal(findBlockedWording('en', ['please select']).length, 1);

assert.equal(findBlockedWording('zh-CN', ['我们曾为在大阪举办的国际会议提供接送服务。']).length, 0);
assert.equal(findBlockedWording('zh-TW', ['我們曾為在大阪舉辦的國際會議提供接送服務。']).length, 0);
assert.equal(findBlockedWording('en', ['I have read the Privacy Policy and agree to be contacted by a representative.']).length, 0);
assert.equal(findBlockedWording('en', ['Please select']).length, 0);

const travelEntry = '<section data-japan-travel-entry><a data-japan-travel-link href="https://japan-travel.info/en/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home" target="_blank" rel="noopener">Visit Japan Travel</a></section>';
assert.deepEqual(validateJapanTravelEntry(travelEntry, 'en'), []);
for (const legacy of ['index-ja.html', 'index-en.html', 'index-ko.html', 'index-zhHant.html']) {
  const legacyEntry = travelEntry.replace('/en/', `/${legacy}`);
  assert.ok(validateJapanTravelEntry(legacyEntry, 'en').some((failure) => failure.includes('unexpected href')));
}
assert.ok(validateJapanTravelEntry(travelEntry.replace('/en/', '/ko/'), 'en').some((failure) => failure.includes('unexpected href')));
assert.ok(validateJapanTravelEntry(travelEntry.replace('noopener', 'nofollow'), 'en').length >= 2);
assert.ok(validateJapanTravelEntry('', 'en').some((failure) => failure.includes('section count')));

console.log('Audit negative-control tests passed');
