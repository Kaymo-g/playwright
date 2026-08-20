/*import { Page, Locator} from "@playwright/test";
import { basePage } from "./basePage";

export class LoginPage extends basePage {
    private readonly pageUrl: string = 'https://ndosisimplifiedautomation.vercel.app/';
    
    get openLoginPage(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }
    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }
    get emailInput(): Locator {
        return this.page.getByPlaceholder('Email');
    }

    get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    async goto(){
        await this.navigateTo(this.pageUrl);
    }

    async clickLoginButton(){
        await this.clickElement(this.openLoginPage);
    }

    async login(email: string, password: string){
        await this.enterText(this.emailInput, email);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
       // await this.page.waitForURL('https://ndosisimplifiedautomation.vercel.app/dashboard');
        await this.page.waitForLoadState('networkidle');

    }

}*/
import { Page } from '@playwright/test';

const BASE_URL = 'https://ndosisimplifiedautomation.vercel.app/';

async function login(
    page: Page,
    { email, password }: { email: string; password: string }
) {
    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
}