import { Page, Locator} from "@playwright/test";
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
        await this.page.pause();
    }

}  