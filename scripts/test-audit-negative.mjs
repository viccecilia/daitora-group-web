import assert from 'node:assert/strict';
import { expectedHreflangMap, validateExactAlternates } from './audit-i18n.mjs';

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

console.log('Audit negative-control tests passed');
