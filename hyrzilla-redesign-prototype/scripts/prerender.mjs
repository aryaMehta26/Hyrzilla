import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const origin = 'https://www.hyrzilla.com';
const escape = (value) => value.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App, metadata } = await server.ssrLoadModule('/src/App.jsx');
  const template = await readFile('dist/index.html', 'utf8');
  const routes = { ...metadata, '/agreements/professional': ['Professional agreement | Hyrzilla', 'Professional service agreement framework.'], '/agreements/employer': ['Employer agreement | Hyrzilla', 'Employer service agreement framework.'], '/404': ['Page not found | Hyrzilla', 'The requested page was not found.'] };
  for (const [path, [title, description]] of Object.entries(routes)) {
    const url = origin + (path === '/' ? '/' : path);
    const noindex = path.startsWith('/agreements/') || path === '/404';
    const schema = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'Hyrzilla', url: `${origin}/`, email: 'hello@hyrzilla.com', sameAs: ['https://www.linkedin.com/company/hyrzilla/'] },
      { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Hyrzilla', url: `${origin}/`, publisher: { '@id': `${origin}/#organization` } }
    ] };
    let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
      .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${escape(title)}`)
      .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${escape(description)}`)
      .replace('</head>', `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/>${noindex ? '<meta name="robots" content="noindex,follow"/>' : ''}<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script><style>.reveal{opacity:1!important;transform:none!important}</style></head>`)
      .replace('<div id="root"></div>', `<div id="root">${renderToString(React.createElement(App, { initialPath: path }))}</div>`);
    const directory = path === '/' || path === '/404' ? 'dist' : `dist${path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/${path === '/404' ? '404' : 'index'}.html`, html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(metadata).map((path) => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>\n`);
  console.log(`Prerendered ${Object.keys(routes).length} routes.`);
} finally {
  await server.close();
}
