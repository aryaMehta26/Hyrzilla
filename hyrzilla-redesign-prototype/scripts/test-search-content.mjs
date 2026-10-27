import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = [
  ['/', 'Hyrzilla | Recruitment &amp; Job Search Support'],
  ['/professionals', 'Job Search Support &amp; Career Services | Hyrzilla'],
  ['/employers', 'Recruitment Services for US &amp; Canadian Employers | Hyrzilla'],
];
for (const [path, title] of pages) {
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8');
  assert.ok(html.includes(`<title>${title}</title>`), `${path}: descriptive title`);
  assert.ok(html.includes(`property="og:title" content="${title}"`), `${path}: social title`);
  assert.ok(html.includes(`href="https://www.hyrzilla.com${path}"`), `${path}: canonical`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one main heading`);
  assert.ok(!html.includes('content="noindex'), `${path}: indexable`);
  if (path === '/') {
    assert.ok(html.includes('Find recruitment support'));
    assert.ok(html.includes('Get job-search support'));
    assert.ok(html.includes('href="/employers"'));
    assert.ok(html.includes('href="/professionals"'));
  }
  if (path === '/employers') {
    assert.ok(html.includes('US &amp; Canadian employers.'));
    assert.ok(html.includes('Start with your hiring needs'));
    assert.ok(html.includes('href="/contact?audience=employer"'));
  }
}
console.log('PASS: prerendered search titles, canonicals, headings, audience links, and employer inquiry route.');
