import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test.beforeEach(async () => {
  console.log(`Running ${test.info().title}`);
});

test('001 - User with valid credentials should login successfully', {
tag: '@login',
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.validateThatLoginPageIsDisplayed();
  await loginPage.fillValidUserCredentials();
  await loginPage.clickLoginButton();
  await dashboardPage.validateThatDashboardPageIsDisplayed();
});

test('002 - User should not login with empty credentials', {
tag: '@login',
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.validateThatLoginPageIsDisplayed();
  await loginPage.clearTextFromCredentialsField();
  await loginPage.clickLoginButton();
  await loginPage.validateThatLoginPageIsDisplayed()
});


test.fail('003 - User with invalid credentials should not be able to login', {
tag: '@login',
}, async ({ page }) => {
  console.log('Test will fail due to the issue https://github.com/mgarutti/tui-qa-challenge/issues/1')
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.validateThatLoginPageIsDisplayed();
  await loginPage.fillInvalidUserCredentials();
  await loginPage.clickLoginButton();
  await loginPage.checkInvalidCredentialsErrorMessage();
});

test.afterEach(async ({ page }) => {
  console.log('Cleaning session and local storage');
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
});