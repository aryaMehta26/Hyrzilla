import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/professionals', '/employers', '/pricing', '/insights', '/about', '/contact', '/privacy', '/terms'];
for (const width of [390, 1440]) {
  test(`public routes: metadata, runtime and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const titles = new Set();
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.hyrzilla.com${route}`);
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByRole('main')).toHaveCount(1);
      const graph = await page.locator('script[type="application/ld+json"]').textContent();
      expect(JSON.parse(graph)['@graph'].find(node => node['@id'].endsWith('#webpage')).url).toBe(`https://www.hyrzilla.com${route}`);
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu, guide, keyboard skip and client-side metadata', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.getByRole('button', { name: 'Toggle menu' }).click();
  await expect(page.locator('.mobile-nav')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-nav')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ask Hyrzilla' }).click();
  await expect(page.locator('.chat-panel')).toBeVisible();
  await page.getByRole('button', { name: 'Close guide' }).click();
  await page.goto('/about');
  await page.getByRole('button', { name: 'Start a conversation' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.hyrzilla.com/contact');
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'];
  expect(graph.some(node => node['@type'] === 'ContactPage' && node.url === 'https://www.hyrzilla.com/contact')).toBe(true);
});

test('homepage automated accessibility in light and dark modes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const mode of ['light', 'dark']) {
    if (mode === 'dark') await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  }
});
