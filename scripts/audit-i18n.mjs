import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import {
  BRAND_LOCKS,
  OFFICIAL_FACTS,
  PAGE_OVERRIDES,
  SEMANTIC_LOCKS,
  SEO_DESCRIPTIONS
} from './i18n-config.mjs';

const ROOT = process.cwd();
const SITE_ORIGIN = 'https://daitora-jp.com';
const PAGES = ['index.html','about.html','business.html','business-hire.html','business-taxi.html','business-auto.html','business-medical.html','business-digital.html','quality.html','works.html','company.html','news.html','contact.html','privacy.html','404.html'];
const CONTENT_PAGES = PAGES.filter((page) => page !== 'company.html');
const SITEMAP_PAGES = PAGES.filter((page) => !['company.html', '404.html'].includes(page));
const SERVICE_PAGES = new Set(['business-hire.html','business-taxi.html','business-auto.html','business-medical.html','business-digital.html']);
const MEDICAL_DISCLAIMER_JA = '当社は医療機関ではなく、診断・治療等の医療行為は行いません。医療行為および医学的判断は、受診先の医療機関が行います。';
const LANGUAGES = {
  ja: { dir: '', html: 'ja' },
  'zh-CN': { dir: 'zh-cn', html: 'zh-CN' },
  en: { dir: 'en', html: 'en' },
  ko: { dir: 'ko', html: 'ko' },
  'zh-TW': { dir: 'zh-tw', html: 'zh-TW' }
};
const LANGUAGE_CODES = Object.keys(LANGUAGES);
const HREFLANG_CODES = [...LANGUAGE_CODES, 'x-default'];
const JAPAN_TRAVEL_URLS = {
  ja: 'https://japan-travel.info/ja/',
  'zh-CN': 'https://japan-travel.info/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  en: 'https://japan-travel.info/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  ko: 'https://japan-travel.info/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  'zh-TW': 'https://japan-travel.info/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home'
};
const AUTOLOAN_URL = 'https://www.daitora-jp.com/autoloan/';
const FOOTER_LABELS = {
  ja: '営業拠点',
  'zh-CN': '营业据点',
  en: 'OUR LOCATIONS',
  ko: '영업 거점',
  'zh-TW': '營業據點'
};
const FOOTER_LOCATIONS = [
  ['OSAKA / TAISHO', '大阪・大正区', OFFICIAL_FACTS.osakaAddress],
  ['OSAKA / MINATO', '大阪・港区', OFFICIAL_FACTS.minatoAddress],
  ['KYOTO / FUSHIMI', '京都・伏見区', OFFICIAL_FACTS.kyotoFooterAddress],
  ['SAKAI / NISHI', '堺市・西区', OFFICIAL_FACTS.sakaiAddress]
];

const BLOCKED_TERMS = {
  'zh-CN': [/大虎/g, /虎丸/g, /车联网/g, /兼容各大机场/g, /交通兼容/g, /我体验到了/g, /多人搬家/g, /想要的车型/g, /多辆车辆投入运行/g, /可以在关西搬家/g, /我们都能搞定/g, /多个设备/g, /规划使用面积/g, /登机地点/g, /集体运动/g, /质量点/g, /听力/g, /脱出/g],
  'zh-TW': [/大虎/g, /虎丸/g, /車聯網/g, /相容各大機場/g, /交通相容/g, /我體驗到了/g, /多人搬家/g, /想要的車型/g, /多輛車輛投入運行/g, /可以在關西搬家/g, /我們都能搞定/g, /多個設備/g, /規劃使用面積/g, /登機地點/g, /集體運動/g, /品質點/g, /聽力/g, /脫出/g],
  en: [
    /To taxi consultation/gi, /Go to corporate consultation/gi, /For other consultations/gi,
    /Contact us from the person in charge/gi, /right machine/gi, /VIP entertainment/gi,
    /Consult a hire car/gi, /Privacy policyand/gi,
    /^please select$/g, /^destination$/g, /^to be decided$/g, /^hope$/g,
    /^under consideration$/g, /^do not wish$/g, /^individual$/g,
    /^sole proprietor$/g, /^send by email$/g, /^quick quote$/g,
    /^flexible arrangements$/g, /^professional driver$/g, /^punctual service$/g
  ],
  ko: [/오토(?!론)/g, /히이야/g, /大寅ハイヤ/g, /탈출 후/g, /청각/g, /배달/g, /납차/g, /계속 사용하는 생각/g, /Daitora네 그룹/g, /^원하는$/g]
};

const BAD_FACT_FRAGMENTS = [/武田/g, /小矢之内/g, /八手之内/g];

function attr(tag, name) {
  return tag.match(new RegExp(`\\s${name}=(['"])([\\s\\S]*?)\\1`, 'i'))?.[2] || '';
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function count(html, regex) {
  return [...html.matchAll(regex)].length;
}

function canonicalUrl(lang, page) {
  if (page === 'company.html') return `${SITE_ORIGIN}/${LANGUAGES[lang].dir ? `${LANGUAGES[lang].dir}/` : ''}about.html`;
  return publicUrl(lang, page);
}

export function publicUrl(lang, page) {
  const prefix = LANGUAGES[lang].dir ? `${LANGUAGES[lang].dir}/` : '';
  if (page === 'index.html') return `${SITE_ORIGIN}/${prefix}`;
  return `${SITE_ORIGIN}/${prefix}${page}`;
}

export function expectedHreflangMap(page) {
  return {
    ja: publicUrl('ja', page),
    'zh-CN': publicUrl('zh-CN', page),
    en: publicUrl('en', page),
    ko: publicUrl('ko', page),
    'zh-TW': publicUrl('zh-TW', page),
    'x-default': publicUrl('ja', page)
  };
}

function expectedSwitcherHref(currentLang, targetLang, page) {
  if (currentLang === 'ja') return targetLang === 'ja' ? page : `${LANGUAGES[targetLang].dir}/${page}`;
  if (targetLang === currentLang) return page;
  if (targetLang === 'ja') return `../${page}`;
  return `../${LANGUAGES[targetLang].dir}/${page}`;
}

export function validateExactAlternates(entries, expected) {
  const failures = [];
  for (const code of HREFLANG_CODES) {
    const matches = entries.filter((entry) => entry.code === code);
    if (matches.length !== 1) failures.push(`${code} count is ${matches.length}`);
    if (matches[0] && matches[0].href !== expected[code]) {
      failures.push(`${code} expected ${expected[code]} but found ${matches[0].href}`);
    }
  }
  for (const entry of entries) {
    if (!HREFLANG_CODES.includes(entry.code)) failures.push(`unexpected hreflang ${entry.code}`);
  }
  return failures;
}

export function validateJapanTravelEntry(html, lang) {
  const failures = [];
  const sections = [...html.matchAll(/<section\b[^>]*data-japan-travel-entry[^>]*>/gi)];
  const links = [...html.matchAll(/<a\b[^>]*data-japan-travel-link[^>]*>/gi)].map((match) => match[0]);
  if (sections.length !== 1) failures.push(`section count is ${sections.length}`);
  if (links.length !== 1) failures.push(`link count is ${links.length}`);
  if (links[0]) {
    if (attr(links[0], 'href') !== JAPAN_TRAVEL_URLS[lang]) failures.push(`unexpected href ${attr(links[0], 'href')}`);
    if (attr(links[0], 'target') !== '_blank') failures.push('link must use target=_blank');
    const rel = attr(links[0], 'rel').split(/\s+/);
    if (!rel.includes('noopener')) failures.push('link must use rel=noopener');
    if (rel.includes('nofollow')) failures.push('link must not use rel=nofollow');
  }
  return failures;
}

function fileFor(lang, page) {
  return path.join(ROOT, LANGUAGES[lang].dir, page);
}

function stripProtected(html) {
  return html
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function textChunks(html) {
  const clean = stripProtected(html);
  const chunks = clean.split(/<[^>]+>/g)
    .map((text) => text.replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  for (const tag of clean.matchAll(/<(?:img|input|textarea|select|button|meta)\b[^>]*>/gi)) {
    for (const name of ['alt', 'title', 'aria-label', 'placeholder', 'content']) {
      const value = attr(tag[0], name).replace(/\s+/g, ' ').trim();
      if (value) chunks.push(value);
    }
  }
  return chunks;
}

export function findBlockedWording(lang, chunks) {
  const findings = [];
  for (const pattern of BLOCKED_TERMS[lang] || []) {
    for (const chunk of chunks) {
      pattern.lastIndex = 0;
      if (pattern.test(chunk)) {
        findings.push({ pattern: String(pattern), chunk });
        break;
      }
    }
  }
  return findings;
}

function isSpecial(url) {
  return /^(?:https?:|mailto:|tel:|data:|#)/i.test(url);
}

function cleanPath(url) {
  return url.split('#')[0].split('?')[0];
}

function relativeTargetExists(sourceFile, url) {
  const clean = cleanPath(url);
  if (!clean || isSpecial(clean)) return true;
  return fs.existsSync(path.resolve(path.dirname(sourceFile), clean.replace(/\//g, path.sep)));
}

function currentGitSha() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function readBrowserQa() {
  const resultFile = path.join(ROOT, 'output', 'playwright', 'prelaunch-audit', 'results.json');
  if (!fs.existsSync(resultFile)) return { state: 'NOT PART OF THIS STATIC AUDIT', detail: 'No browser QA result file is present.' };
  try {
    const data = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
    const failureCount = ['overflow_failures', 'resource_failures', 'console_errors']
      .reduce((sum, key) => sum + (Array.isArray(data[key]) ? data[key].length : Number(data[key] || 0)), 0);
    const expectedWidths = [320, 390, 768, 1024, 1440];
    const widths = (data.viewports || []).map((item) => typeof item === 'number' ? item : item.width);
    const currentSha = currentGitSha();
    if (data.commit_sha !== currentSha || !expectedWidths.every((width) => widths.includes(width)) || failureCount !== 0) {
      return { state: 'STALE OR INCOMPLETE', detail: 'Browser evidence does not match the current commit, required viewports, or zero-failure criteria.' };
    }
    return { state: 'PASSED', detail: `${data.pages_checked || 0} pages; viewports ${expectedWidths.join(', ')}px; zero recorded failures.` };
  } catch (error) {
    return { state: 'INVALID', detail: `Could not parse browser QA evidence: ${error.message}` };
  }
}

export function runAudit({ writeReport = true } = {}) {
  const errors = [];
  const stats = Object.fromEntries(LANGUAGE_CODES.map((lang) => [lang, {
    pages: 0,
    kanaResiduals: 0,
    brokenLinks: 0,
    missingResources: 0,
    seoErrors: 0,
    duplicateIds: 0,
    factErrors: 0,
    wordingErrors: 0
  }]));
  const descriptions = Object.fromEntries(LANGUAGE_CODES.map((lang) => [lang, new Map()]));
  const report = (lang, page, type, detail, sample = '') => {
    errors.push({ lang, page, type, detail, sample });
    const stat = stats[lang];
    if (!stat) return;
    if (type.includes('kana')) stat.kanaResiduals += 1;
    else if (/link|anchor|href/.test(type)) stat.brokenLinks += 1;
    else if (/resource/.test(type)) stat.missingResources += 1;
    else if (/seo|canonical|hreflang|sitemap|twitter|og-|description|title/.test(type)) stat.seoErrors += 1;
    else if (type === 'duplicate-id') stat.duplicateIds += 1;
    else if (/fact|address|phone|license/.test(type)) stat.factErrors += 1;
    else if (/wording|brand|ui-lock/.test(type)) stat.wordingErrors += 1;
  };

  for (const lang of LANGUAGE_CODES) {
    for (const page of PAGES) {
      const file = fileFor(lang, page);
      stats[lang].pages += 1;
      if (!fs.existsSync(file)) {
        report(lang, page, 'missing-file', `Missing ${path.relative(ROOT, file)}`);
        continue;
      }
      const html = fs.readFileSync(file, 'utf8');
      if (!new RegExp(`<html[^>]+lang=["']${LANGUAGES[lang].html}["']`, 'i').test(html)) report(lang, page, 'html-lang', `Expected ${LANGUAGES[lang].html}`);

      const titleTags = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
      const descTags = [...html.matchAll(/<meta\b[^>]*name=["']description["'][^>]*>/gi)];
      const canonicalTags = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
      if (titleTags.length !== 1) report(lang, page, 'seo-title-count', `title count is ${titleTags.length}`);
      if (descTags.length !== 1) report(lang, page, 'seo-description-count', `description count is ${descTags.length}`);
      if (canonicalTags.length !== 1) report(lang, page, 'seo-canonical-count', `canonical count is ${canonicalTags.length}`);
      const description = descTags[0] ? decodeEntities(attr(descTags[0][0], 'content')) : '';
      if (description) {
        const previous = descriptions[lang].get(description);
        if (previous && page !== 'company.html') report(lang, page, 'seo-description-duplicate', `Description duplicates ${previous}`, description);
        else descriptions[lang].set(description, page);
      }
      if (page !== 'company.html' && SEO_DESCRIPTIONS[page]?.[lang] && description !== SEO_DESCRIPTIONS[page][lang]) {
        report(lang, page, 'seo-description-value', 'Description does not match the page-specific structured source', description);
      }
      const canonical = canonicalTags[0] ? attr(canonicalTags[0][0], 'href') : '';
      if (canonical && canonical !== canonicalUrl(lang, page)) report(lang, page, 'canonical-url', `Expected ${canonicalUrl(lang, page)}`, canonical);
      if (canonical.includes('#')) report(lang, page, 'canonical-anchor', 'Canonical URLs must not include fragments', canonical);

      const ids = new Map();
      for (const tag of html.matchAll(/\sid=["']([^"']+)["']/g)) ids.set(tag[1], (ids.get(tag[1]) || 0) + 1);
      for (const [id, occurrences] of ids) if (occurrences > 1) report(lang, page, 'duplicate-id', `${id} appears ${occurrences} times`);

      const h1Count = count(html, /<h1\b[\s\S]*?<\/h1>/gi);
      if (h1Count !== 1) report(lang, page, 'heading', `h1 count is ${h1Count}`);
      const faviconCount = count(html, /<link\b[^>]*rel=["']icon["'][^>]*>/gi);
      if (faviconCount !== 1) report(lang, page, 'favicon', `favicon count is ${faviconCount}`);

      if (page === 'company.html') {
        if (!/noindex\s*,?\s*follow/i.test(html)) report(lang, page, 'seo-robots', 'Redirect page must be noindex,follow');
        if (!/about\.html#company-profile/.test(html)) report(lang, page, 'company-redirect', 'Redirect must preserve #company-profile');
      } else {
        const alternateEntries = [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi)]
          .map((match) => ({ code: attr(match[0], 'hreflang'), href: attr(match[0], 'href') }));
        for (const failure of validateExactAlternates(alternateEntries, expectedHreflangMap(page))) report(lang, page, 'hreflang-exact', failure);

        for (const code of LANGUAGE_CODES) {
          const switchLinks = [...html.matchAll(/<a\b[^>]*hreflang=["'][^"']+["'][^>]*>/gi)]
            .filter((match) => attr(match[0], 'hreflang') === code);
          if (switchLinks.length !== 2) report(lang, page, 'language-switcher-count', `${code} switch-link count is ${switchLinks.length}`);
          for (const link of switchLinks) {
            const expected = expectedSwitcherHref(lang, code, page);
            if (attr(link[0], 'href') !== expected) report(lang, page, 'language-switcher-href', `${code} expected ${expected}`, attr(link[0], 'href'));
          }
        }

        const social = [
          ['og:type', 'property'], ['og:title', 'property'], ['og:description', 'property'], ['og:url', 'property'], ['og:image', 'property'],
          ['twitter:card', 'name'], ['twitter:title', 'name'], ['twitter:description', 'name'], ['twitter:image', 'name']
        ];
        for (const [key, kind] of social) {
          const tags = [...html.matchAll(new RegExp(`<meta\\b[^>]*${kind}=["']${key.replace(':', '\\:')}["'][^>]*>`, 'gi'))];
          if (tags.length !== 1) report(lang, page, 'seo-social', `${key} count is ${tags.length}`);
        }
        if (!/<meta\b[^>]*name=["']twitter:card["'][^>]*content=["']summary_large_image["'][^>]*>/i.test(html)) report(lang, page, 'twitter-card', 'twitter:card must be summary_large_image');

        const structuredData = [];
        for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
          try {
            structuredData.push(JSON.parse(match[1]));
          } catch (error) {
            report(lang, page, 'seo-jsonld', `Invalid JSON-LD: ${error.message}`);
          }
        }
        if (!structuredData.some((item) => item?.['@type'] === 'Organization')) report(lang, page, 'seo-jsonld', 'Missing Organization JSON-LD');
        if (SERVICE_PAGES.has(page) && !structuredData.some((item) => item?.['@type'] === 'Service')) report(lang, page, 'seo-jsonld', 'Detailed business page is missing Service JSON-LD');
      }

      if (page === 'contact.html') {
        if (!/name=["']site_language["']/.test(html)) report(lang, page, 'site-language', 'Missing site_language field');
        if (!/<form\b[^>]*data-contact-form[^>]*method=["']post["']/i.test(html)) report(lang, page, 'form-method', 'Contact form must declare method=post');
        if (!/<fieldset\b[^>]*data-contact-fieldset[^>]*disabled/i.test(html)) report(lang, page, 'form-failsafe', 'Initial form fieldset must be disabled');
        if (!/<button\b[^>]*type=["']submit["'][^>]*disabled[^>]*aria-disabled=["']true["']/i.test(html)) report(lang, page, 'form-failsafe', 'Initial submit button must be disabled and aria-disabled');
        if (/\bnovalidate\b/i.test(html)) report(lang, page, 'form-validation', 'novalidate is not allowed');
        if (!/<noscript>[\s\S]*?<\/noscript>/i.test(html)) report(lang, page, 'form-noscript', 'Missing no-JavaScript fallback');
        if (!/assets\/js\/contact-form-core\.js/.test(html)) report(lang, page, 'form-failsafe', 'Missing fail-safe contact form core');
        const formTag = html.match(/<form\b[^>]*data-contact-form[^>]*>/i)?.[0] || '';
        if (attr(formTag, 'data-submit-endpoint') !== '/api/send-contact.php') report(lang, page, 'form-endpoint', 'Contact form must use the bundled same-origin /api/send-contact.php endpoint');
        if (/DAITORA_CONTACT_FORM_URL\s*=/.test(html)) report(lang, page, 'form-endpoint', 'Runtime endpoint configuration must not be embedded in page HTML');
        if (!/<input\b[^>]*name=["']website["'][^>]*tabindex=["']-1["'][^>]*>/i.test(html)) report(lang, page, 'form-honeypot', 'Missing disabled-tab-order honeypot field');
        for (const type of ['hire','taxi','auto','corporate','recruit','general']) {
          if (!new RegExp(`<option\\b[^>]*value=["']${type}["']`, 'i').test(html)) report(lang, page, 'form-type', `Missing contact type ${type}`);
        }
      }

      if (page === 'index.html') {
        for (const failure of validateJapanTravelEntry(html, lang)) report(lang, page, 'japan-travel-entry', failure);
      }
      if (page === 'business-auto.html') {
        const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']*autoloan[^"']*)["'][^>]*>/gi)].map((match) => decodeEntities(match[1]));
        if (links.length === 0) report(lang, page, 'autoloan-link', 'Missing Auto Loan application link');
        for (const href of links) {
          if (href !== AUTOLOAN_URL) report(lang, page, 'autoloan-link', `Auto Loan URL must be ${AUTOLOAN_URL}`, href);
        }
      }
      if (page === 'business-medical.html') {
        const disclaimer = PAGE_OVERRIDES['business-medical.html']?.[MEDICAL_DISCLAIMER_JA]?.[lang] || MEDICAL_DISCLAIMER_JA;
        if (!html.includes(disclaimer)) report(lang, page, 'medical-disclaimer', 'Required medical-services disclaimer is missing', disclaimer);
        const visible = textChunks(html).join(' ');
        const prohibited = {
          ja: [/当社(?:が|は).{0,12}(?:診断|治療|医療行為)を行います/],
          'zh-CN': [/本公司.{0,12}(?:提供诊断|实施治疗|提供医疗行为)/],
          en: [/Daitora.{0,24}(?:diagnoses|provides treatment|makes medical decisions)/i],
          ko: [/당사.{0,16}(?:진단합니다|치료합니다|의료행위를 합니다)/],
          'zh-TW': [/本公司.{0,12}(?:提供診斷|實施治療|提供醫療行為)/]
        };
        for (const pattern of prohibited[lang] || []) if (pattern.test(visible)) report(lang, page, 'medical-claim', 'Unverified direct medical-service claim found', String(pattern));
      }

      if (page !== 'company.html') {
        if (!html.includes('data-business-menu') || !html.includes('data-business-menu-panel')) {
          report(lang, page, 'business-menu', 'Header business menu is missing');
        }
        for (const href of ['business-medical.html','business-digital.html']) {
          if (!html.includes(`href="${href}"`)) report(lang, page, 'business-entry', `Missing global business entry ${href}`);
        }
      }

      if (html.includes('site-footer')) {
        const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] || '';
        for (const [region, name, address] of FOOTER_LOCATIONS) {
          for (const value of [region, name, address]) {
            if (!footer.includes(value)) report(lang, page, 'footer-location', 'Footer is missing an exact location value', value);
          }
        }
        if (!footer.includes(`id="footer-locations-title">${FOOTER_LABELS[lang]}`)) report(lang, page, 'footer-label', 'Footer location heading is missing or not localized', FOOTER_LABELS[lang]);
        if ((footer.match(/class="footer-location"/g) || []).length !== 4) report(lang, page, 'footer-location', 'Footer must contain exactly four location units');
        if (!footer.includes('&copy; Daitora Co., Ltd. All Rights Reserved.')) report(lang, page, 'footer-legal', 'Footer copyright is missing');
        if (!/<a href="privacy\.html">[^<]+<\/a>/.test(footer)) report(lang, page, 'footer-legal', 'Footer privacy link is missing');
        if (/大阪本社：|京都営業所：|Osaka Head Office:|Kyoto Office:|大阪总部：|大阪總部：|오사카 본사:/.test(footer)) report(lang, page, 'footer-legacy', 'Legacy one-line footer address remains');
      }
      for (const bad of BAD_FACT_FRAGMENTS) {
        bad.lastIndex = 0;
        if (bad.test(html)) report(lang, page, 'fact-address', 'Known incorrect address fragment found', String(bad));
      }
      if (page === 'about.html') {
        const requiredFacts = [
          OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.passengerLicense,
          OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.travelRegistration, OFFICIAL_FACTS.usedCarPermit,
          OFFICIAL_FACTS.established, OFFICIAL_FACTS.representative, OFFICIAL_FACTS.annualSales, OFFICIAL_FACTS.capital,
          OFFICIAL_FACTS.mainPhone, OFFICIAL_FACTS.fax, OFFICIAL_FACTS.email
        ];
        for (const fact of requiredFacts) if (!html.includes(fact)) report(lang, page, 'fact-lock', 'Missing locked company fact', fact);
      }
      if (page === 'contact.html') {
        for (const fact of [
          OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.mainPhone,
          OFFICIAL_FACTS.fax, OFFICIAL_FACTS.kyotoPhone, OFFICIAL_FACTS.email
        ]) if (!html.includes(fact)) report(lang, page, 'fact-lock', 'Contact page is missing an exact locked company fact', fact);
      }

      for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>/gi)) {
        const tag = match[0];
        const href = match[1];
        if (!href || href === '#') report(lang, page, 'broken-href', 'Empty href and href="#" are not allowed');
        if (/^(?:javascript:|file:)/i.test(href) || /^[a-z]:[\\/]/i.test(href)) report(lang, page, 'unsafe-href', 'Unsafe/local href', href);
        if (/target=["']_blank["']/i.test(tag) && !/rel=["'][^"']*\bnoopener\b/i.test(tag)) report(lang, page, 'external-link', 'target=_blank requires rel=noopener', tag);
        const clean = cleanPath(href);
        if (clean && !isSpecial(clean) && /\.html$/i.test(clean) && !relativeTargetExists(file, href)) report(lang, page, 'broken-link', 'Missing internal page', href);
        if (lang !== 'ja' && !/hreflang=/i.test(tag) && clean.startsWith('../') && !clean.startsWith('../assets/')) report(lang, page, 'language-link', 'Localized internal link leaves the current language', href);
        const fragment = href.includes('#') ? href.slice(href.indexOf('#') + 1) : '';
        if (fragment) {
          const targetFile = clean && /\.html$/i.test(clean) ? path.resolve(path.dirname(file), clean.replace(/\//g, path.sep)) : file;
          if (fs.existsSync(targetFile) && !new RegExp(`\\sid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(fs.readFileSync(targetFile, 'utf8'))) report(lang, page, 'broken-anchor', `Missing #${fragment}`, href);
        }
      }

      for (const image of html.matchAll(/<img\b[^>]*>/gi)) if (!/\salt=["'][^"']*["']/i.test(image[0])) report(lang, page, 'image-alt', 'Image is missing alt', image[0]);
      for (const match of html.matchAll(/\s(?:src|href)=["']([^"']+)["']/gi)) {
        const url = match[1];
        const clean = cleanPath(url);
        if (clean && !isSpecial(clean) && /\.(?:css|js|png|jpe?g|webp|gif|svg|ico|mp4|webm|json)$/i.test(clean) && !relativeTargetExists(file, url)) report(lang, page, 'missing-resource', 'Missing relative resource', url);
      }
      for (const match of html.matchAll(/\sdata-poster=["']([^"']+)["']/gi)) {
        const url = match[1];
        const clean = cleanPath(url);
        if (clean && !isSpecial(clean) && !relativeTargetExists(file, url)) report(lang, page, 'missing-resource', 'Missing hero poster resource', url);
      }
      for (const match of html.matchAll(/\sdata-(?:desktop|mobile)-videos=["']([^"']+)["']/gi)) {
        for (const url of match[1].split(',').map((item) => item.trim()).filter(Boolean)) {
          const clean = cleanPath(url);
          if (clean && !isSpecial(clean) && !relativeTargetExists(file, url)) report(lang, page, 'missing-resource', 'Missing hero video resource', url);
        }
      }

      const chunks = textChunks(html);
      if (lang !== 'ja') {
        for (const chunk of chunks) {
          const allowedOfficialText = [
            OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.minatoAddress, OFFICIAL_FACTS.kyotoAddress,
            OFFICIAL_FACTS.kyotoFooterAddress, OFFICIAL_FACTS.sakaiAddress, OFFICIAL_FACTS.passengerLicense,
            OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.usedCarPermit, OFFICIAL_FACTS.representative
          ].some((value) => chunk.includes(value));
          if (/[ぁ-ゖァ-ヺ]/.test(chunk) && chunk !== '日本語' && !allowedOfficialText) report(lang, page, 'kana-residual', 'Unapproved Japanese kana remains', chunk.slice(0, 180));
        }
      }
      for (const finding of findBlockedWording(lang, chunks)) {
        report(lang, page, 'wording-lock', `Blocked wording ${finding.pattern}`, finding.chunk.slice(0, 180));
      }
      for (const [source, locked] of Object.entries(BRAND_LOCKS)) {
        const officialNameAllowedInTravelCopy = source === '株式会社大寅'
          && page === 'index.html'
          && ['zh-CN', 'zh-TW'].includes(lang)
          && chunks.some((chunk) => chunk.includes('Japan Travel') && chunk.includes('Daitora Group') && chunk.includes('株式会社大寅'));
        if (lang !== 'ja' && !officialNameAllowedInTravelCopy && chunks.some((chunk) => chunk.includes(source))) report(lang, page, 'brand-lock', 'Untranslated Japanese brand source remains', source);
      }

      const navLabels = [
        SEMANTIC_LOCKS['nav.home'][lang], SEMANTIC_LOCKS['nav.about'][lang], SEMANTIC_LOCKS['nav.business'][lang],
        SEMANTIC_LOCKS['nav.quality'][lang], SEMANTIC_LOCKS['nav.works'][lang], SEMANTIC_LOCKS['nav.company'][lang], SEMANTIC_LOCKS['nav.news'][lang]
      ];
      if (page !== 'company.html' && html.includes('class="nav"')) for (const label of navLabels) if (!html.includes(`>${label}</a>`)) report(lang, page, 'ui-lock', 'Missing locked navigation label', label);
    }
  }

  const sitemapFile = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapFile)) report('all', 'sitemap.xml', 'missing-file', 'Missing sitemap.xml');
  else {
    const sitemap = fs.readFileSync(sitemapFile, 'utf8');
    const blocks = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
    const expectedCount = SITEMAP_PAGES.length * LANGUAGE_CODES.length;
    if (blocks.length !== expectedCount) report('all', 'sitemap.xml', 'sitemap-count', `Expected ${expectedCount} URL blocks but found ${blocks.length}`);
    for (const page of SITEMAP_PAGES) {
      for (const lang of LANGUAGE_CODES) {
        const loc = publicUrl(lang, page);
        const matches = blocks.filter((block) => block.includes(`<loc>${loc}</loc>`));
        if (matches.length !== 1) {
          report(lang, 'sitemap.xml', 'sitemap-url', `${loc} count is ${matches.length}`);
          continue;
        }
        const entries = [...matches[0].matchAll(/<xhtml:link\b[^>]*>/gi)].map((match) => ({ code: attr(match[0], 'hreflang'), href: attr(match[0], 'href') }));
        for (const failure of validateExactAlternates(entries, expectedHreflangMap(page))) report(lang, 'sitemap.xml', 'sitemap-hreflang', failure, loc);
      }
    }
    if (/\/company\.html<\/loc>|\/404\.html<\/loc>/.test(sitemap)) report('all', 'sitemap.xml', 'sitemap-excluded-page', 'Redirect and 404 pages must not be listed');
  }

  const browserQa = readBrowserQa();
  const qa = [
    '# Multilingual QA',
    '',
    'This report is generated from the current working tree by `node scripts/audit-i18n.mjs`.',
    '',
    '## Automated Audit Summary',
    '',
    '| Language | Pages | Kana residuals | Broken links | Missing resources | SEO errors | Duplicate IDs | Fact errors | Wording errors |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...LANGUAGE_CODES.map((lang) => {
      const item = stats[lang];
      return `| ${lang} | ${item.pages} | ${item.kanaResiduals} | ${item.brokenLinks} | ${item.missingResources} | ${item.seoErrors} | ${item.duplicateIds} | ${item.factErrors} | ${item.wordingErrors} |`;
    }),
    '',
    `Static audit status: ${errors.length ? 'FAILED' : 'PASSED'}`,
    `Responsive browser QA: ${browserQa.state}`,
    `Browser QA detail: ${browserQa.detail}`,
    '',
    '## Errors',
    '',
    ...(errors.length ? errors.map((error) => `- [${error.lang}/${error.page}] ${error.type}: ${error.detail}${error.sample ? ` :: ${error.sample}` : ''}`) : ['- None']),
    '',
    '## Manual Review Still Required',
    '',
    '- Native-language review remains required for non-Japanese copy. Static checks do not constitute native approval.',
    '- The approximately 100-vehicle claim, the reporting year for annual sales, Kyoto office details, branch coverage, G20/EXPO/brand-event claims and news dates require business-owner confirmation.',
    '- Medical-tourism and digital-marketing service scope requires business-owner and compliance review. No medical institution partnership is asserted by the current copy.',
    '- The bundled PHP contact endpoint requires real-server mail delivery testing before launch. Automated source checks do not prove that the hosting mail transport can deliver messages.',
    '- Official Osaka company facts are locked against the current public company profile; any future change must be updated deliberately in the structured fact source.'
  ].join('\n');
  if (writeReport) fs.writeFileSync(path.join(ROOT, 'MULTILINGUAL_QA.md'), `${qa}\n`, 'utf8');
  return { errors, stats, browserQa };
}

const invokedDirectly = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (invokedDirectly) {
  const result = runAudit();
  if (result.errors.length) {
    for (const error of result.errors.slice(0, 200)) console.error(`[${error.lang}/${error.page}] ${error.type}: ${error.detail}${error.sample ? ` :: ${error.sample}` : ''}`);
    if (result.errors.length > 200) console.error(`...and ${result.errors.length - 200} more errors`);
    process.exitCode = 1;
  } else {
    console.log('i18n audit passed');
  }
}
