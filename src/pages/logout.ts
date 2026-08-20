import { Page } from "@playwright/test";

async function logout(page: Page) {
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForLoadState('networkidle');
}