/*import {test, expect} from '../src/fixtures/customFixtures';
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
})*/
import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// ─── Test Data ───────────────────────────────────────────────────────────────
const BASE_URL = 'https://ndosisimplifiedautomation.vercel.app/#practice';

const ADMIN = {
  email: 'Kamo10@gmail.com',
  password: 'Kamo@2026',
};

const STUDENT = {
  email: 'Kamo101@gmail.com',
  password: 'Kamo@2026',
};

const COURSE_NAME = 'Testing Course';

// ─── Helper: Fill & Submit Login Form ────────────────────────────────────────
async function login(
  page: Page,
  { email, password }: { email: string; password: string }
) {
  await page.goto(BASE_URL);

  // Fill in login credentials
  //await page.getByLabel(/email/i).fill(email);
  //await page.getByLabel(/password/i).fill(password);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  //await page.getByRole('button', { name: /login|sign in/i }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait for page to settle after login
  await page.waitForLoadState('networkidle');
}

// ─── Helper: Logout ───────────────────────────────────────────────────────────
async function logout(page: Page) {
  // Click user menu or logout button (adjust selector if needed)
  await page.getByRole('button', { name: /logout|sign out/i }).click();
  await page.waitForLoadState('networkidle');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN TEST
// ─────────────────────────────────────────────────────────────────────────────
test('Admin enrolls student into Testing Course and student validates enrollment', async ({ page }) => {

  // ── STEP 1: Login as Admin ─────────────────────────────────────────────────
  await test.step('Login as admin', async () => {
    await login(page, ADMIN);

    // Confirm we are logged in as admin
    await expect(page.getByText(/Welcome/i).first()).toBeVisible();
  });

  // ── STEP 2: Navigate to Admin Panel ───────────────────────────────────────
  await test.step('Navigate to Admin Panel', async () => {
    await page.getByText('Menu', { exact: true }).click();
    await page.locator('span').filter({ hasText: '🔧 Admin Panel' }).last().click();
   // await page.getByRole('button', { name: '🔧Admin Panel' }).click();
   // await page.getByText('Admin Panel', { exact: true }).click();
   // await page.locator(':text("🔧")')
   // await page.getByRole('link', { name: /Admin Panel/i }).click();
    await page.waitForLoadState('networkidle');

    // Confirm admin panel loaded
    await expect(page.getByText(/admin panel/i)).toBeVisible();
  });

  // ── STEP 3: Click Enrollments → Enroll User ───────────────────────────────
  await test.step('Click Enrollments then Enroll User', async () => {
    // Click "Enrollments" menu item
    await page.getByRole('link', { name: /enrollments/i }).click();
    await page.waitForLoadState('networkidle');

    // Click "Enroll User" button / link
    await page.getByRole('button', { name: /enroll user/i }).click();
    await page.waitForLoadState('networkidle');

    // Confirm the enroll form/dialog is visible
    await expect(page.getByText(/enroll user/i)).toBeVisible();
  });

  // ── STEP 4: Enroll Student Account to Testing Course ─────────────────────
  await test.step('Enroll student account to Testing Course', async () => {

    // Enter the student's email / username in the user lookup field
    await page.getByLabel(/user|email|username/i).fill(STUDENT.email);

    // Select the course from a dropdown or search field
    const courseField = page.getByLabel(/course/i);
    await courseField.fill(COURSE_NAME);

    // If course appears in a dropdown list, click the matching option
    const courseOption = page.getByRole('option', { name: COURSE_NAME });
    if (await courseOption.isVisible()) {
      await courseOption.click();
    }

    // Submit the enrollment
    await page.getByRole('button', { name: /enroll|submit|confirm/i }).click();
    await page.waitForLoadState('networkidle');

    // Confirm success message
    await expect(
      page.getByText(/enrolled|success|enrollment complete/i)
    ).toBeVisible();
  });

  // ── STEP 5: Logout as Admin ────────────────────────────────────────────────
  await test.step('Logout as admin', async () => {
    await logout(page);

    // Confirm we are back at the login screen
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });

  // ── STEP 6: Login as Student ───────────────────────────────────────────────
  await test.step('Login as student', async () => {
    await login(page, STUDENT);

    // Confirm we are logged in as student
    await expect(page.getByText(/dashboard|my courses|welcome/i).first()).toBeVisible();
  });

  // ── STEP 7: Validate Student is Enrolled in Testing Course ────────────────
  await test.step('Validate student is enrolled in Testing Course', async () => {

    // Navigate to "My Courses" or the course list
    const myCoursesLink = page.getByRole('link', { name: /my courses|courses/i });
    if (await myCoursesLink.isVisible()) {
      await myCoursesLink.click();
      await page.waitForLoadState('networkidle');
    }

    // Assert that "Testing Course" is visible in the student's enrolled courses
    await expect(
      page.getByText(COURSE_NAME, { exact: false })
    ).toBeVisible();

    console.log(`✅ Student "${STUDENT.email}" is successfully enrolled in "${COURSE_NAME}"`);
  });

});