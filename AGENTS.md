# DAITORA Group Website

Static corporate website for DAITORA Group. Japanese root pages are the primary pages; localized pages are generated artifacts.

## Source of truth

- `README.md`: project structure, contact-form behavior, and local checks.
- `DEPLOYMENT_CHECKLIST.md`: release scope, server requirements, and release gates.
- `PRELAUNCH_AUDIT.md`: known launch risks and prelaunch evidence.
- `CONTENT_VERIFICATION.md`: business-content verification boundaries.
- `MULTILINGUAL_QA.md`: generated multilingual audit result and required human review.
- `.github/workflows/site-qa.yml`: the current automated Site QA baseline.

Read the relevant document before changing a high-risk area. Do not duplicate those documents here.

## Working rules

- Keep changes localized; do not scan the whole repository or refactor unrelated code unless necessary.
- Preserve the existing architecture and verified business facts unless the owner explicitly requests a change.
- Do not deploy, change DNS, server configuration, production credentials, or production secrets without explicit owner approval.
- Never expose secrets in browser code, Git, or logs.
- Do not modify `/autoloan/` unless the task explicitly names it.
- Prefer targeted checks for small changes; use the relevant test and audit scope for broader changes.
- Report what changed and what was actually verified. Do not treat automated tests as proof of production mail delivery or business approval.

## Multilingual pages

Japanese root `*.html` pages are the source. `scripts/build-i18n.mjs`, with `scripts/i18n-content.json` and `scripts/i18n-config.mjs`, produces `/en/`, `/zh-cn/`, `/ko/`, `/zh-tw/`, language metadata, and `sitemap.xml`.

Before a multilingual edit, determine whether the source belongs in a Japanese page, structured i18n content/configuration, or the build behavior. Do not hand-edit five page copies and create drift. Run the build and `scripts/audit-i18n.mjs` when a multilingual source, build, SEO metadata, or sitemap change is involved.

## Risk and verification levels

- **Level 1:** copy, icon, spacing, or a small page UI change. Locate the shared implementation if applicable and run focused checks.
- **Level 2:** shared UI, multi-page work, multilingual changes, SEO, new pages, or medium bugs. Run relevant tests and audits.
- **Level 3:** `api/send-contact.php`, mail, HMAC/shared secrets, Origin/CORS, rate limiting, data collection, production, deployment, or server-to-server integration. Read `README.md` and `DEPLOYMENT_CHECKLIST.md` first; establish risks and a validation plan before changing anything. Do not send real mail or make production changes without explicit approval.

The full Site QA baseline is: JavaScript syntax checks; contact-form fail-safe and negative-control tests; PHP syntax and endpoint tests; i18n build and audit; deterministic-output check; and `git diff --exit-code`. Reserve the full sequence for release-level or high-risk work.
