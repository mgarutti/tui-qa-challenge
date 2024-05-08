import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test.beforeEach(async () => {
    console.log(`Running ${test.info().title}`);
});
  
test('001 - Dashboard page should not be accessible by unauthenticated users', {
tag: '@dashboard',
}, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLoginPage();
    console.log('Cleaning session and local storage to remove any tokens');
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await dashboardPage.navigateToDashboardPage();
    await loginPage.validateThatLoginPageIsDisplayed();
});

test('002 - Dashboard page should be displayed correctly after a successfull authentication', {
tag: '@dashboard',
}, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithValidUser();
    await dashboardPage.validateThatDashboardPageIsDisplayed();
    await dashboardPage.validateThatProductInformationIsDisplayed();
    await dashboardPage.validateThatLogoutButtonIsDisplayed();
});

test('003 - Product list table should not be empty', {
tag: '@dashboard',
}, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginWithValidUser();
    await dashboardPage.validateThatDashboardPageIsDisplayed();
    await dashboardPage.validateThatProductListTableIsNotEmpty()
});

test.afterEach(async ({ page }) => {
  console.log('Cleaning session and local storage');
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
});