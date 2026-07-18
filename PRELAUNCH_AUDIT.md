# Daitora Group Prelaunch Audit

## Audit Record

- Audit date: 2026-07-18 (Asia/Tokyo)
- Baseline branch: `main`
- Baseline commit: `9323b8f3a435157bde558c80cefa72ea0aa00298`
- Baseline remote: `origin/main` matched the baseline commit before work began
- Final commit: the commit containing this report; the exact SHA is recorded in the release handoff after Git creates it
- Languages: Japanese, English, Simplified Chinese, Korean, Traditional Chinese
- Pages: 65 static HTML files, 13 per language
- Conclusion: **CONDITIONALLY READY**

The static website is technically suitable for deployment preview. Formal production launch must wait until the contact form is connected to and validated against a real server-side endpoint. Business facts, legal wording, and native-language copy also require the responsible human reviewers.

## Scope

The audit covered the multilingual build and audit scripts, all generated HTML, shared CSS and JavaScript, SEO metadata, internal links, local resources, the contact form, mobile navigation, language switching, Hero media behavior, accessibility, representative Lighthouse runs, repository hygiene, and deployment documentation.

## PASS

- The baseline worktree was clean, on `main`, and synchronized with `origin/main`.
- All 65 expected pages exist: 13 each for `ja`, `en`, `zh-CN`, `ko`, and `zh-TW`.
- JavaScript syntax checks pass for `build-i18n.mjs`, `audit-i18n.mjs`, and `site.js`.
- The multilingual audit reports zero broken internal links, missing referenced resources, duplicate IDs, SEO count errors, and unapproved Japanese-kana residuals.
- Each content page has one title, description, canonical, H1, and favicon plus the required hreflang, Open Graph, and Twitter metadata.
- `company.html` is excluded from the sitemap and routes to the matching localized `about.html#company-profile`; its canonical omits the fragment.
- `404.html` is marked `noindex,follow` in all languages.
- `robots.txt`, `sitemap.xml`, canonical URLs, and social metadata consistently use `https://daitora-jp.com/`.
- All referenced CSS, JavaScript, images, poster images, and the production Hero video exist.
- No empty links, `href="#"`, `javascript:` links, `file://` links, Windows absolute paths, insecure HTTP subresources, or unsafe `target="_blank"` links were found.
- The only tracked video is the Hero clip actually referenced by all five home pages. The larger local video library remains ignored by Git.
- The Hero has a poster, uses one production clip, does not start a redundant rotation timer, pauses while the page is hidden, and falls back to the poster for reduced-motion users.
- The static multilingual audit now records only checks it actually executes. Responsive browser evidence is accepted only when its result file matches the current commit, required viewports, and zero-failure criteria; otherwise it is reported as stale or outside the static audit.
- Mobile navigation and the language menu support `aria-expanded`, Escape close, focus return, and keyboard-visible focus.
- Form type preselection and dynamic field enable/disable behavior pass for all six inquiry types and all five languages.
- Automated fail-safe tests verify that missing/non-HTTPS endpoints do not call `fetch`, HTML or malformed responses do not produce success, only explicit JSON success or HTTP 204 succeeds, requests time out, and duplicate in-flight submissions are rejected. The mocks are test-only and are not production endpoints.
- No API key, token, password, private key, production secret, internal endpoint, or exposed source map was found in tracked production source.
- Final representative Lighthouse accessibility retests scored 100 for the home page, Contact page, and Daitora Auto page after the contrast and accessible-name fixes.

## WARNING

- Local throttled Lighthouse mobile home runs scored 82 with LCP around 4.9 seconds. The main contributor is the 3.75 MB Hero video plus image transfer size. The desktop home score was 99.
- Several referenced Taxi and Auto images are approximately 1.9-2.2 MB, and the Philosophy image is approximately 3.75 MB. Converting responsive derivatives to modern formats is recommended after visual approval.
- Several tracked image source assets are not currently referenced. They are retained to avoid deleting user source material, but a curated production upload must exclude unreferenced assets.
- Production cache headers, compression, CSP, HSTS, clickjacking protection, and HTTP-to-HTTPS redirects cannot be verified on the local static server. They must be configured and checked on the deployment host.
- Lighthouse on Windows generated complete JSON reports but returned an `EPERM` cleanup warning while removing its temporary directory. Scores were read from the completed reports; the environment warning is not a page failure.
- `/autoloan/` is managed outside this static repository. Its route, TLS behavior, privacy handling, and availability require deployment-side verification.

## BLOCKER

- **The contact form has no production backend endpoint.** `window.DAITORA_CONTACT_FORM_URL` is intentionally unset, so the submit button is disabled and an honest localized unavailable message is shown. Production launch must not enable submission until a real HTTPS endpoint, server-side validation, spam protection, notification workflow, retention policy, and error monitoring have been implemented and tested.

## MANUAL REVIEW

- Confirm the meaning and current accuracy of the approximately 100-vehicle statement.
- Confirm all addresses, office names, and the Osaka / Kyoto / Sakai / Minato operating-area wording.
- Confirm every licence and permit number.
- Confirm the G20, EXPO, international brand-event, VIP, and corporate case descriptions are publishable and accurate.
- Confirm every news publication date.
- Obtain native-language review for all four localized versions; automated audit and machine polishing do not constitute native approval.
- Obtain legal review of the privacy policy, data-use purposes, storage period, inquiry records, and contact method.
- Confirm the production contact-form data-retention and deletion policy.

## Automatic Fixes Applied

- Added `noindex,follow` to generated 404 pages and added the corresponding audit rule.
- Strengthened the multilingual audit for one H1, one favicon, robots directives, social metadata, unsafe/empty links, anchor targets, image alt attributes, and `noopener` on new-window links.
- Corrected the header brand accessible name and visible-label spacing across all languages.
- Added hidden column headers to the home and news tables.
- Improved small-label color contrast on light and dark Contact surfaces.
- Added clear global keyboard focus styling.
- Fixed language-menu Escape handling so focus returns to the language button without closing the parent mobile drawer.
- Added a 15-second form request timeout while preserving localized network-failure handling.
- Replaced hard-coded browser-QA claims with evidence-bound reporting and deterministic static-audit totals.
- Added exact reciprocal hreflang checks, sitemap alternate validation, fact locks, wording locks, negative-control tests, deterministic-build checks, and GitHub Actions enforcement.

## Not Automatically Fixed

- No backend was invented or connected for the contact form.
- Business facts, public case claims, permit numbers, and legal text were not changed because they require responsible-owner confirmation.
- Unreferenced source images were not deleted because they may be retained production source material; the deployment checklist instead requires a curated publish scope.
- Large approved visual assets were not recompressed because that can change image quality and crop appearance and needs visual sign-off.

## Commands Executed

```powershell
git status
git branch --show-current
git log -1 --oneline
git fetch origin
git rev-parse HEAD
git rev-parse origin/main
node --check scripts/build-i18n.mjs
node --check scripts/audit-i18n.mjs
node --check scripts/i18n-config.mjs
node --check assets/js/contact-form-core.js
node --check assets/js/site.js
node scripts/test-contact-form.mjs
node scripts/test-audit-negative.mjs
node scripts/build-i18n.mjs
node scripts/audit-i18n.mjs
git ls-files
git count-objects -vH
```

Browser automation used the repository-ignored `output/playwright/prelaunch-audit/` directory. Representative Lighthouse checks covered Japanese Home, English Home, Simplified Chinese Home, Contact, and Daitora Auto on desktop and mobile.

## Test Results

- Multilingual static audit: PASS, zero reported errors.
- Page count: PASS, 65 total and 13 per language.
- Responsive overflow/resource/runtime matrix: see the current `MULTILINGUAL_QA.md`; browser QA is not inferred from static analysis and is only marked passed when current-commit evidence is available.
- Dynamic form fields and localized safe-unavailable state: PASS.
- Mocked form error/network/duplicate-submit behavior: PASS.
- Mobile menu, language menu, and company-profile anchor: PASS.
- Representative final accessibility: PASS, score 100.
- Representative SEO and Best Practices: PASS, score 100 in the sampled Lighthouse runs.
- Performance: WARNING, mobile home score 82 in local throttled Lighthouse; other sampled mobile pages scored 86-94 and sampled desktop pages scored 99-100.

## SEO Result

Automated checks pass for metadata counts, canonical language routing, six hreflang values including `x-default`, Open Graph, Twitter Card, sitemap exclusions, robots directives, and resource existence. DNS, actual HTTPS redirects, response headers, and live social-card fetching remain deployment checks.

## Contact Form State

The frontend is ready to send JSON by HTTPS `POST` after a production endpoint is supplied. It sends `site_language`, disables hidden type-specific fields, prevents repeated submission while a request is active, and provides localized required/failure/network/timeout/success states. Success requires HTTP 204 or a JSON 2xx response containing `{ "success": true }`; HTML and ambiguous 2xx responses fail closed. It currently remains deliberately disabled because there is no real endpoint.

## Performance And Assets

- Production Hero video: approximately 3.75 MB.
- Largest tracked referenced image: approximately 3.75 MB.
- No referenced resource returned 404 during browser automation.
- The large ignored local video library is not tracked and must not be copied to production.
- Publish only the files listed in `DEPLOYMENT_CHECKLIST.md`; do not deploy this repository wholesale.

## Post-Deployment Checks

1. Configure and verify the real contact endpoint and its server-side controls.
2. Verify HTTPS redirect, HSTS, CSP, frame protection, MIME types, compression, and long-lived immutable asset caching.
3. Verify `robots.txt`, `sitemap.xml`, canonical URLs, hreflang, and OG images from the public domain.
4. Verify the externally managed `/autoloan/` route.
5. Test `tel:`, `mailto:`, form notification delivery, and privacy consent on real devices.
6. Complete business, legal, and native-language approvals before removing the release hold.

## Final Conclusion

**CONDITIONALLY READY** - The static technical pages can be deployed for preview, but formal production launch requires a tested contact-form backend plus business-fact, legal, and native-language approval.
