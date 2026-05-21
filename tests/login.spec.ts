import {test, expect} from '../src/fixtures/customFixtures';
import {validUserLoginData} from '../src/data/testData';

test.describe('Login to Ndosi Automation Website', () => {
    test('should allow user to login with valid credentials', async ({loginPage}) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.emailInput.fill(validUserLoginData.adminUser.email);
        await loginPage.passwordInput.fill(validUserLoginData.adminUser.password);
        await loginPage.clickLoginButton();
        // Add assertions here to verify successful login, e.g., checking for a specific element that appears after login
    })
})

test.describe('Login to Welcome Page', () => {
    test('should allow user to login with valid credentials', async ({loginPage}) => {
        await loginPage.goto();
        await loginPage.clickLoginButton();
        await loginPage.login(validUserLoginData.adminUser.email, validUserLoginData.adminUser.password);
        // Add assertions here to verify successful login, e.g., checking for a specific element that appears after login
    })
})