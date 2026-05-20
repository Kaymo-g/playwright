import {Page, Locator, expect} from '@playwright/test'

export class basePage {
    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string){
        console.log(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    async clickElement(locator: Locator){
        console.log(`Clicking on locator: ${locator}`);
        await locator.click();
    }

    async enterText(locator: Locator, text: string){
        console.log(`Entering text: "${text}" into locator: ${locator}`);
        await locator.fill(text);
    }

    async verifyElementVisible(locator: Locator){
        console.log(`Verifying visibility of locator: ${locator}is visible`);
        await expect(locator).toBeVisible();
    }
}