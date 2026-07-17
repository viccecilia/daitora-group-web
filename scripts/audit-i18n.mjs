import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const pages = ['index.html','about.html','business.html','business-hire.html','business-taxi.html','business-auto.html','quality.html','works.html','company.html','news.html','contact.html','privacy.html','404.html'];
const languages = {
  ja: { dir: '', html: 'ja' },
  'zh-CN': { dir: 'zh-cn', html: 'zh-CN' },
  en: { dir: 'en', html: 'en' },
  ko: { dir: 'ko', html: 'ko' },
  'zh-TW': { dir: 'zh-tw', html: 'zh-TW' }
};
const allHreflang = ['ja', 'zh-CN', 'en', 'ko', 'zh-TW', 'x-default'];
const allowedKana = [
  '日本語',
  '近運自ニ第990号',
  '近運自一第737号',
  '京都府京都市伏見区竹田東小屋ノ内町95'
];
const blockedBrandTerms = {
  'zh-CN': [/大虎/, /虎丸/],
  'zh-TW': [/大虎/, /虎丸/],
  ko: [/오토/, /히이야/, /大寅ハイヤ/],
  en: []
};

const results = [];
const errors = [];

function readHtml(lang, page) {
  const file = path.join(ROOT, languages[lang].dir, page);
  return { file, html: fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '' };
}

function publicUrl(lang, page) {
  const prefix = languages[lang].dir ? `${languages[lang].dir}/` : '';
  if (page === 'index.html') return `https://daitora-jp.com/${prefix}`;
  if (page === 'company.html') return `https://daitora-jp.com/${prefix}about.html`;
  return `https://daitora-jp.com/${prefix}${page}`;
}

function countMatches(html, regex) {
  return [...html.matchAll(regex)].length;
}

function stripProtected(html) {
  return html
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function textChunks(html) {
  const clean = stripProtected(html);
  const chunks = [];
  for (const text of clean.split(/<[^>]+>/g)) {
    const value = text.replace(/\s+/g, ' ').trim();
    if (value) chunks.push(value);
  }
  for (const [, value] of clean.matchAll(/\s(?:alt|title|aria-label|placeholder|value|content)="([^"]*)"/g)) {
    const normalized = value.replace(/\s+/g, ' ').trim();
    if (normalized) chunks.push(normalized);
  }
  return chunks;
}

function report(lang, page, type, detail, sample = '') {
  errors.push({ lang, page, type, detail, sample });
}

function isExternalOrSpecial(url) {
  return /^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(url);
}

function normalizeHref(url) {
  return url.split('#')[0].split('?')[0];
}

function resourceExists(file, url) {
  const clean = normalizeHref(url);
  if (!clean || isExternalOrSpecial(clean)) return true;
  if (!/\.(css|js|png|jpg|jpeg|webp|gif|svg|ico|mp4|webm|json)$/i.test(clean)) return true;
  const resolved = path.resolve(path.dirname(file), clean.replace(/\//g, path.sep));
  return fs.existsSync(resolved);
}

function auditPage(lang, page) {
  const { file, html } = readHtml(lang, page);
  const stat = {
    lang,
    page,
    kanaResiduals: 0,
    brokenLinks: 0,
    seoDuplicates: 0,
    resourceMissing: 0,
    duplicateIds: 0
  };
  if (!html) {
    report(lang, page, 'missing-file', `Missing ${file}`);
    results.push(stat);
    return;
  }

  if (!new RegExp(`<html[^>]+lang="${languages[lang].html}"`, 'i').test(html)) {
    report(lang, page, 'html-lang', `Expected html lang="${languages[lang].html}"`);
  }

  const titleCount = countMatches(html, /<title\b[\s\S]*?<\/title>/gi);
  const descCount = countMatches(html, /<meta\s+[^>]*name=["']description["'][^>]*>/gi);
  const canonicalCount = countMatches(html, /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi);
  for (const [name, count] of [['title', titleCount], ['description', descCount], ['canonical', canonicalCount]]) {
    if (count !== 1) {
      stat.seoDuplicates += Math.max(1, count);
      report(lang, page, 'seo-count', `${name} count is ${count}`);
    }
  }

  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] || '';
  const expectedCanonical = publicUrl(lang, page);
  if (canonical && canonical !== expectedCanonical) {
    report(lang, page, 'canonical-url', `Expected canonical ${expectedCanonical}`, canonical);
  }
  if (page === 'company.html' && canonical.includes('#')) {
    report(lang, page, 'canonical-anchor', 'Company redirect canonical must not include an anchor', canonical);
  }

  const robotsTags = [...html.matchAll(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/gi)];
  const expectsNoindex = page === 'company.html' || page === '404.html';
  if (robotsTags.length > 1) {
    stat.seoDuplicates += robotsTags.length;
    report(lang, page, 'robots-count', `robots meta count is ${robotsTags.length}`);
  }
  if (expectsNoindex && (robotsTags.length !== 1 || !/\bnoindex\b/i.test(robotsTags[0]?.[1] || ''))) {
    report(lang, page, 'robots-noindex', `${page} must have exactly one noindex robots meta tag`);
  }
  if (!expectsNoindex && robotsTags.some((tag) => /\bnoindex\b/i.test(tag[1]))) {
    report(lang, page, 'robots-index', 'Indexable content page must not be marked noindex');
  }

  const h1Count = countMatches(html, /<h1\b[\s\S]*?<\/h1>/gi);
  if (h1Count !== 1) report(lang, page, 'heading', `h1 count is ${h1Count}`);
  const faviconCount = countMatches(html, /<link\s+[^>]*rel=["']icon["'][^>]*>/gi);
  if (faviconCount !== 1) report(lang, page, 'favicon-count', `favicon count is ${faviconCount}`);

  if (page !== 'company.html') {
    for (const code of allHreflang) {
      if (!new RegExp(`hreflang=["']${code.replace('-', '\\-')}["']`, 'i').test(html)) {
        report(lang, page, 'hreflang', `Missing hreflang ${code}`);
      }
    }

    for (const code of allHreflang.filter((item) => item !== 'x-default')) {
      if (!new RegExp(`<a\\b[^>]*hreflang=["']${code.replace('-', '\\-')}["']`, 'i').test(html)) {
        report(lang, page, 'language-switcher', `Missing language-switcher link for ${code}`);
      }
    }

    const socialTags = [
      ['og:type', /<meta\s+[^>]*property=["']og:type["'][^>]*>/gi],
      ['og:title', /<meta\s+[^>]*property=["']og:title["'][^>]*>/gi],
      ['og:description', /<meta\s+[^>]*property=["']og:description["'][^>]*>/gi],
      ['og:url', /<meta\s+[^>]*property=["']og:url["'][^>]*>/gi],
      ['og:image', /<meta\s+[^>]*property=["']og:image["'][^>]*>/gi],
      ['twitter:card', /<meta\s+[^>]*name=["']twitter:card["'][^>]*>/gi],
      ['twitter:title', /<meta\s+[^>]*name=["']twitter:title["'][^>]*>/gi],
      ['twitter:description', /<meta\s+[^>]*name=["']twitter:description["'][^>]*>/gi],
      ['twitter:image', /<meta\s+[^>]*name=["']twitter:image["'][^>]*>/gi]
    ];
    for (const [name, regex] of socialTags) {
      const count = countMatches(html, regex);
      if (count !== 1) {
        stat.seoDuplicates += Math.max(1, count);
        report(lang, page, 'seo-social', `${name} count is ${count}`);
      }
    }
    if (!/<meta\s+[^>]*name=["']twitter:card["'][^>]*content=["']summary_large_image["'][^>]*>/i.test(html)) {
      report(lang, page, 'twitter-card', 'twitter:card must be summary_large_image');
    }
  }

  if (page === 'company.html' && !/about\.html#company-profile/.test(html)) {
    report(lang, page, 'company-redirect', 'Company redirect must target about.html#company-profile');
  }

  if (page === 'contact.html' && !/name=["']site_language["']/.test(html)) {
    report(lang, page, 'site-language', 'Contact form is missing site_language');
  }

  const ids = new Map();
  for (const [, id] of html.matchAll(/\sid=["']([^"']+)["']/g)) {
    ids.set(id, (ids.get(id) || 0) + 1);
  }
  for (const [id, count] of ids.entries()) {
    if (count > 1) {
      stat.duplicateIds += 1;
      report(lang, page, 'duplicate-id', `Duplicate id "${id}" appears ${count} times`);
    }
  }

  for (const tag of html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>/gi)) {
    const fullTag = tag[0];
    const href = tag[1];
    if (!href || href === '#') {
      stat.brokenLinks += 1;
      report(lang, page, 'empty-href', 'Empty href and href="#" are not allowed');
      continue;
    }
    if (/^javascript:/i.test(href)) {
      stat.brokenLinks += 1;
      report(lang, page, 'unsafe-href', `javascript: link is not allowed: ${href}`);
      continue;
    }
    if (/^file:/i.test(href) || /^[a-z]:[\\/]/i.test(href)) {
      stat.brokenLinks += 1;
      report(lang, page, 'local-href', `Local filesystem link is not allowed: ${href}`);
      continue;
    }
    if (/target=["']_blank["']/i.test(fullTag) && !/rel=["'][^"']*\bnoopener\b/i.test(fullTag)) {
      report(lang, page, 'external-rel', 'target="_blank" link must include rel="noopener"', fullTag);
    }
    const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : '';
    if (hash) {
      const anchorFile = normalizeHref(href);
      const targetPath = anchorFile && /\.html$/i.test(anchorFile)
        ? path.resolve(path.dirname(file), anchorFile.replace(/\//g, path.sep))
        : file;
      if (fs.existsSync(targetPath)) {
        const targetHtml = fs.readFileSync(targetPath, 'utf8');
        if (!new RegExp(`\\sid=["']${hash.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}["']`).test(targetHtml)) {
          stat.brokenLinks += 1;
          report(lang, page, 'broken-anchor', `Missing anchor target #${hash} in ${path.relative(ROOT, targetPath)}`);
        }
      }
    }
    if (fullTag.includes('hreflang=')) continue;
    const cleanHref = normalizeHref(href);
    if (!cleanHref || isExternalOrSpecial(cleanHref)) continue;
    if (/\.html$/i.test(cleanHref)) {
      const target = path.resolve(path.dirname(file), cleanHref.replace(/\//g, path.sep));
      if (!fs.existsSync(target)) {
        stat.brokenLinks += 1;
        report(lang, page, 'broken-link', `Missing internal target ${href}`);
      }
      if (cleanHref.startsWith('../') && !cleanHref.startsWith('../assets/')) {
        report(lang, page, 'language-link', `Internal content link leaves current language: ${href}`);
      }
    }
  }

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=["'][^"']*["']/i.test(image[0])) report(lang, page, 'image-alt', 'Image is missing an alt attribute', image[0]);
  }

  for (const [, attr, url] of html.matchAll(/\s(src|href)=["']([^"']+)["']/gi)) {
    if (!resourceExists(file, url)) {
      stat.resourceMissing += 1;
      report(lang, page, 'missing-resource', `${attr}="${url}"`);
    }
  }

  for (const chunk of textChunks(html)) {
    if (lang !== 'ja' && /[ぁ-んァ-ン]/.test(chunk) && !allowedKana.some((allowed) => chunk.includes(allowed))) {
      stat.kanaResiduals += 1;
      report(lang, page, 'kana-residual', 'Unapproved Japanese kana residual', chunk.slice(0, 160));
    }
    for (const pattern of blockedBrandTerms[lang] || []) {
      if (pattern.test(chunk)) {
        report(lang, page, 'brand-lock', `Blocked brand term ${pattern}`, chunk.slice(0, 160));
      }
    }
  }

  results.push(stat);
}

for (const lang of Object.keys(languages)) {
  for (const page of pages) auditPage(lang, page);
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const sitemapPages = pages.filter((page) => !['company.html', '404.html'].includes(page));
if (!sitemap) {
  report('all', 'sitemap.xml', 'missing-file', 'Missing sitemap.xml');
} else {
  const sitemapBlocks = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
  for (const page of sitemapPages) {
    for (const lang of Object.keys(languages)) {
      const loc = publicUrl(lang, page);
      const block = sitemapBlocks.find((item) => item.includes(`<loc>${loc}</loc>`)) || '';
      if (!block) {
        report(lang, 'sitemap.xml', 'sitemap-url', `Missing sitemap URL ${loc}`);
        continue;
      }
      for (const code of allHreflang) {
        if (!new RegExp(`hreflang=["']${code.replace('-', '\\-')}["']`, 'i').test(block)) {
          report(lang, 'sitemap.xml', 'sitemap-hreflang', `Missing ${code} alternate for ${loc}`);
        }
      }
    }
  }
  if (/\/company\.html<\/loc>|\/404\.html<\/loc>/.test(sitemap)) {
    report('all', 'sitemap.xml', 'sitemap-excluded-page', 'company.html and 404.html must not be listed in sitemap.xml');
  }
}

const byLang = Object.fromEntries(Object.keys(languages).map((lang) => {
  const rows = results.filter((item) => item.lang === lang);
  return [lang, {
    pages: rows.length,
    kanaResiduals: rows.reduce((sum, item) => sum + item.kanaResiduals, 0),
    brokenLinks: rows.reduce((sum, item) => sum + item.brokenLinks, 0),
    seoDuplicates: rows.reduce((sum, item) => sum + item.seoDuplicates, 0),
    resourceMissing: rows.reduce((sum, item) => sum + item.resourceMissing, 0),
    duplicateIds: rows.reduce((sum, item) => sum + item.duplicateIds, 0)
  }];
}));

const qa = [
  '# Multilingual QA',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Automated Audit Summary',
  '',
  '| Language | Pages | Japanese kana residuals | Broken links | Missing resources | SEO duplicate/count errors | Duplicate IDs |',
  '| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
  ...Object.entries(byLang).map(([lang, item]) => `| ${lang} | ${item.pages} | ${item.kanaResiduals} | ${item.brokenLinks} | ${item.resourceMissing} | ${item.seoDuplicates} | ${item.duplicateIds} |`),
  '',
  `Audit status: ${errors.length ? 'FAILED' : 'PASSED'}`,
  '',
  '## Responsive Check Status',
  '',
  '- Browser QA completed on 2026-07-17 at 320, 390, 768, 1024, and 1440px.',
  '- 325 page/viewport combinations (65 pages at five widths) across all five languages passed the horizontal-overflow check.',
  '- Navigation, language switcher, company-profile anchor, localized contact form, and mobile menu focus/ESC behavior were checked.',
  '- Evidence: `output/playwright/prelaunch-audit/` (internal only; not part of the production deployment).',
  '- Layout checks are manual browser QA and are not inferred from this static audit script.',
  '',
  '## Errors',
  '',
  ...(errors.length ? errors.map((error) => `- [${error.lang}/${error.page}] ${error.type}: ${error.detail}${error.sample ? ` :: ${error.sample}` : ''}`) : ['- None']),
  '',
  '## Notes For Human Review',
  '',
  '- Brand names are locked to Daitora Group, Daitora Chauffeur & Private Transportation, Toramaru Taxi, and Daitora Auto / Used Car Sales.',
  '- Official addresses, license numbers, public case claims, dates, and business figures still require business-side confirmation.',
  '- Server-side 301 redirect recommendation: map /company.html and localized /company.html paths to their corresponding /about.html#company-profile user-facing destinations while keeping canonical URLs without anchors.'
].join('\n');

fs.writeFileSync(path.join(ROOT, 'MULTILINGUAL_QA.md'), qa, 'utf8');

if (errors.length) {
  for (const error of errors.slice(0, 200)) {
    console.error(`[${error.lang}/${error.page}] ${error.type}: ${error.detail}${error.sample ? ` :: ${error.sample}` : ''}`);
  }
  if (errors.length > 200) console.error(`...and ${errors.length - 200} more errors`);
  process.exitCode = 1;
} else {
  console.log('i18n audit passed');
}
