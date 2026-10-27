import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = [
  ['/', 'Hyrzilla | Recruitment &amp; Job Search Support'],
  ['/professionals', 'Job Search Support &amp; Career Services | Hyrzilla'],
  ['/employers', 'Recruitment Services for US &amp; Canadian Employers | Hyrzilla'],
  ['/about', 'About Hyrzilla | Recruitment &amp; Career Support'],
];
for (const [path, title] of pages) {
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8');
  assert.ok(html.includes(`<title>${title}</title>`), `${path}: descriptive title`);
  assert.ok(html.includes(`property="og:title" content="${title}"`), `${path}: social title`);
  assert.ok(html.includes(`href="https://www.hyrzilla.com${path}"`), `${path}: canonical`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one main heading`);
  assert.ok(!html.includes('content="noindex'), `${path}: indexable`);
  assert.ok(html.includes('property="og:site_name" content="Hyrzilla"'), `${path}: site name`);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const organization = graph.find(item => item['@type'] === 'Organization');
  const website = graph.find(item => item['@type'] === 'WebSite');
  assert.equal(organization.name, 'Hyrzilla');
  assert.equal(organization.logo.url, 'https://www.hyrzilla.com/logo.svg');
  assert.ok(organization.sameAs.includes('https://www.linkedin.com/company/hyrzilla/'));
  assert.equal(website.name, 'Hyrzilla');
  assert.equal(website.alternateName, 'hyrzilla.com');
  assert.equal(graph.find(item => item['@id'].endsWith('#webpage')).url, `https://www.hyrzilla.com${path}`);
  if (path === '/about') {
    assert.ok(graph.some(item => item['@type'] === 'AboutPage'));
    assert.ok(html.includes('Hyrzilla: recruitment and job-search support'));
  }
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
const logo = await readFile('dist/logo.svg', 'utf8');
assert.ok(logo.includes('width="256" height="256"'));
console.log('PASS: search metadata, brand graph, logo, About identity, headings, audience links, and employer inquiry route.');
