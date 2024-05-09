import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { UtilsPage } from '../utils/browser.util';

test.beforeEach(async () => {
  console.log(`Running ${test.info().title}`);
});

test('001 - User with valid credentials should login successfully', {
tag: ['@login', '@smoke'],
}, async ({ page }) => {
  const LOGIN_PAGE = new LoginPage(page);
  const DASHBOARD_PAGE = new DashboardPage(page);
  await LOGIN_PAGE.navigateToLoginPage();
  await LOGIN_PAGE.validateThatLoginPageIsDisplayed();
  await LOGIN_PAGE.fillValidUserCredentials();
  await LOGIN_PAGE.clickLoginButton();
  await DASHBOARD_PAGE.validateThatDashboardPageIsDisplayed();
});

test('002 - User should not login with empty credentials', {
tag: ['@login', '@smoke'],
}, async ({ page }) => {
  const LOGIN_PAGE = new LoginPage(page);
  await LOGIN_PAGE.navigateToLoginPage();
  await LOGIN_PAGE.validateThatLoginPageIsDisplayed();
  await LOGIN_PAGE.clearTextFromCredentialsField();
  await LOGIN_PAGE.clickLoginButton();
  await LOGIN_PAGE.validateThatLoginPageIsDisplayed()
});


test.fail('003 - User with invalid credentials should not be able to login', {
tag: ['@login', '@smoke'],
}, async ({ page }) => {
  console.log('Test will fail due to the issue https://github.com/mgarutti/tui-qa-challenge/issues/1')
  const LOGIN_PAGE = new LoginPage(page);
  await LOGIN_PAGE.navigateToLoginPage();
  await LOGIN_PAGE.validateThatLoginPageIsDisplayed();
  await LOGIN_PAGE.fillInvalidUserCredentials();
  await LOGIN_PAGE.clickLoginButton();
  await LOGIN_PAGE.checkInvalidCredentialsErrorMessage();
});

test.afterEach(async ({ page }) => {
  const UTILS_PAGE = new UtilsPage(page);
  await UTILS_PAGE.clearBrowserSessionAndStorage(page)
});