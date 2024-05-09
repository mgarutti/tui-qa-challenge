import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { UtilsPage } from '../utils/browser.util';

test.beforeEach(async () => {
    console.log(`Running ${test.info().title}`);
});
  
test('001 - Dashboard page should not be accessible by unauthenticated users', {
tag: ['@dashboard', '@smoke'],
}, async ({ page }) => {
    const LOGIN_PAGE = new LoginPage(page);
    const DASHBOARD_PAGE = new DashboardPage(page);
    await LOGIN_PAGE.navigateToLoginPage();
    console.log('Cleaning session and local storage to remove any tokens');
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await DASHBOARD_PAGE.navigateToDashboardPage();
    await LOGIN_PAGE.validateThatLoginPageIsDisplayed();
});

test('002 - Dashboard page should be displayed correctly after a successfull authentication', {
tag: ['@dashboard', '@smoke'],
}, async ({ page }) => {
    const LOGIN_PAGE = new LoginPage(page);
    const DASHBOARD_PAGE = new DashboardPage(page);
    await LOGIN_PAGE.navigateToLoginPage();
    await LOGIN_PAGE.loginWithValidUser();
    await DASHBOARD_PAGE.validateThatDashboardPageIsDisplayed();
    await DASHBOARD_PAGE.validateThatProductInformationIsDisplayed();
    await DASHBOARD_PAGE.validateThatLogoutButtonIsDisplayed();
});

test('003 - Product list table should not be empty', {
tag: ['@dashboard', '@smoke'],
}, async ({ page }) => {
    const LOGIN_PAGE = new LoginPage(page);
    const DASHBOARD_PAGE = new DashboardPage(page);
    await LOGIN_PAGE.navigateToLoginPage();
    await LOGIN_PAGE.loginWithValidUser();
    await DASHBOARD_PAGE.validateThatDashboardPageIsDisplayed();
    await DASHBOARD_PAGE.validateThatProductInformationIsDisplayed();
    await DASHBOARD_PAGE.validateThatProductListTableIsNotEmpty();
});

test('004 - Logout from Dashboard page should work correctly', {
tag: ['@dashboard', '@smoke'],
}, async ({ page }) => {
    const LOGIN_PAGE = new LoginPage(page);
    const DASHBOARD_PAGE = new DashboardPage(page);
    const UTILS_PAGE = new UtilsPage(page);
    await LOGIN_PAGE.navigateToLoginPage();
    await LOGIN_PAGE.loginWithValidUser();
    await DASHBOARD_PAGE.validateThatDashboardPageIsDisplayed();
    await DASHBOARD_PAGE.validateThatLogoutButtonIsDisplayed();
    await DASHBOARD_PAGE.clickLogoutButton();
    await LOGIN_PAGE.validateThatLoginPageIsDisplayed();
    await UTILS_PAGE.validateIfUserTokenWasProperlyRemoved(page);
});

test.afterEach(async ({ page }) => {
    const UTILS_PAGE = new UtilsPage(page);
    await UTILS_PAGE.clearBrowserSessionAndStorage(page)
});