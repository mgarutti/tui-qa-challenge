import { expect, type Locator, type Page } from '@playwright/test';

let username = process.env.LOGIN_USERNAME as string;
let password = process.env.LOGIN_PASSWORD as string;

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly logoutBtn: Locator;
  readonly productId: Locator;
  readonly productTitle: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productRating: Locator;
  readonly productThumbnail: Locator;


  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.getByRole('heading', { name: 'Welcome, User!' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    this.productId = page.getByRole('cell', { name: 'ID', exact: true });
    this.productTitle = page.getByRole('cell', { name: 'Title' });
    this.productName = page.getByRole('cell', { name: 'Name' });
    this.productDescription = page.getByRole('cell', { name: 'Description' });
    this.productPrice = page.getByRole('cell', { name: 'Price' });
    this.productRating = page.getByRole('cell', { name: 'Rating' });
    this.productThumbnail = page.getByRole('cell', { name: 'Thumbnail' });
  }

  async navigateToDashboardPage() {
    await this.page.goto('./dashboard.html');
  }

  async dashboardPageIsDisplayed() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async productInformationIsDisplayed() {
    await expect(this.productId).toBeVisible();
    await expect(this.productTitle).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productRating).toBeVisible();
    await expect(this.productThumbnail).toBeVisible();
  }

}