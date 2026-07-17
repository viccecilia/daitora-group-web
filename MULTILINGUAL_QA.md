# Multilingual QA

Generated: 2026-07-17T09:57:12.070Z

## Automated Audit Summary

| Language | Pages | Japanese kana residuals | Broken links | Missing resources | SEO duplicate/count errors | Duplicate IDs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ja | 13 | 0 | 0 | 0 | 0 | 0 |
| zh-CN | 13 | 0 | 0 | 0 | 0 | 0 |
| en | 13 | 0 | 0 | 0 | 0 | 0 |
| ko | 13 | 0 | 0 | 0 | 0 | 0 |
| zh-TW | 13 | 0 | 0 | 0 | 0 | 0 |

Audit status: PASSED

## Responsive Check Status

- Browser QA completed on 2026-07-17 at 320, 390, 768, 1024, and 1440px.
- 325 page/viewport combinations (65 pages at five widths) across all five languages passed the horizontal-overflow check.
- Navigation, language switcher, company-profile anchor, localized contact form, and mobile menu focus/ESC behavior were checked.
- Evidence: `output/playwright/prelaunch-audit/` (internal only; not part of the production deployment).
- Layout checks are manual browser QA and are not inferred from this static audit script.

## Errors

- None

## Notes For Human Review

- Brand names are locked to Daitora Group, Daitora Chauffeur & Private Transportation, Toramaru Taxi, and Daitora Auto / Used Car Sales.
- Official addresses, license numbers, public case claims, dates, and business figures still require business-side confirmation.
- Server-side 301 redirect recommendation: map /company.html and localized /company.html paths to their corresponding /about.html#company-profile user-facing destinations while keeping canonical URLs without anchors.