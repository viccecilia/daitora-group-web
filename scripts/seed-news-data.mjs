import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const languages = { ja: '', en: 'en', ko: 'ko', 'zh-CN': 'zh-cn', 'zh-TW': 'zh-tw' };
const clean = (value = '') => value.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const block = (html, marker, end) => html.split(marker)[1]?.split(end)[0] ?? '';
const parsed = {};

for (const [lang, dir] of Object.entries(languages)) {
  const html = fs.readFileSync(path.join(root, dir, 'news.html'), 'utf8');
  const table = block(html, '<tbody data-news-list>', '</tbody>') || block(html, '<tbody>', '</tbody>');
  const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((match) => {
    const body = match[1];
    return {
      date: clean(body.match(/<time>(.*?)<\/time>/s)?.[1]).replaceAll('.', '-'),
      category: clean(body.match(/class="category">([\s\S]*?)<\/td>/)?.[1]),
      title: clean(body.match(/<h3>([\s\S]*?)<\/h3>/)?.[1]),
      summary: clean(body.match(/class="news-summary">([\s\S]*?)<\/p>/)?.[1]),
      tags: [...body.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((m) => clean(m[1])),
    };
  });
  const detail = block(html, '<div class="timeline news-detail-list"', '</div>\n      </div>\n    </section>');
  const articles = [...detail.matchAll(/<article>([\s\S]*?)<\/article>/g)].map((match) => ({
    title: clean(match[1].match(/<h3>([\s\S]*?)<\/h3>/)?.[1]),
    body: clean(match[1].match(/class="news-lead">([\s\S]*?)<\/p>/)?.[1]),
  }));
  parsed[lang] = rows.map((row, index) => ({ ...row, body: articles[index]?.body || row.summary }));
}

const items = parsed.ja.map((base, index) => ({
  id: `legacy-${base.date}-${index + 1}`,
  date: base.date,
  published: true,
  updatedAt: new Date().toISOString(),
  content: Object.fromEntries(Object.keys(languages).map((lang) => [lang, parsed[lang][index] || base])),
}));
fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(path.join(root, 'data', 'news.json'), JSON.stringify(items, null, 2) + '\n');
console.log(`Seeded ${items.length} news records.`);
