//fixtures
import {test as base} from '@playwright/test'
import {LoginPage} from '../pages/loginPage';

type CustomFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<CustomFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
})