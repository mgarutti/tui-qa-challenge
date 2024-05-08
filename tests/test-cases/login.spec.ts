import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async () => {
  console.log(`Running ${test.info().title}`);
});

test('User with valid credentials should login successfully', {
tag: '@login',
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginPageIsDisplayed();
  await loginPage.fillValidUserCredentials();
  await loginPage.clickLoginButton();
});

test.afterEach(async ({ page }) => {
  console.log('Cleaning session and local storage');
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
});