import { test, expect } from '@playwright/test';

test.describe('Admin routing & auth', () => {
  test('redirects unauthenticated /admin/dashboard to /admin/login', async ({ page }) => {
    const resp = await page.goto('/admin/dashboard');
    // If server redirects, Playwright may follow; check final URL
    expect(page.url()).toContain('/admin/login');
  });

  test('redirects unauthenticated /admin/leads/:id to /admin/login', async ({ page }) => {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    await page.goto(`/admin/leads/${fakeId}`);
    expect(page.url()).toContain('/admin/login');
  });
});
