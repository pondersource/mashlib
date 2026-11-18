const { test, expect } = require('@playwright/test');
test('standalone production browser renders RDF from another origin', async ({ page }) => {
    const target = 'http://localhost:5002/profile.ttl#me';
    const read = page.waitForResponse(response =>
        response.url() === target.split('#')[0] && response.request().method() === 'GET' && response.ok(),
    );
    await page.goto('/browse.html?uri=' + encodeURIComponent(target));
    await read;
    await expect(page.locator('#uriField')).toHaveValue(target);
    await expect(page.getByText('Playwright Pod profile', { exact: true }).first()).toBeVisible();
    expect(new URL(page.url()).searchParams.get('uri')).toBe(target);
    await page.reload();
    await expect(page.getByText('Playwright Pod profile', { exact: true }).first()).toBeVisible();
});
