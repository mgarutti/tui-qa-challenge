import { expect, type Locator, type Page } from '@playwright/test';

let username: string = process.env.LOGIN_USERNAME!;
let password: string = process.env.LOGIN_PASSWORD!;
let errorMsg = "";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessageField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username:');
    this.passwordInput = page.getByLabel('Password:');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.errorMessageField = page.getByText(errorMsg);
  }

  async navigateToLoginPage() {
    await this.page.goto('./index.html');
  }

  async loginPageIsDisplayed() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async fillValidUserCredentials() {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async fillInvalidUserCredentials() {
    await this.usernameInput.fill("michaelscott")
    await this.passwordInput.fill("password123")
  }

  async clickLoginButton() {
    await expect(this.loginBtn).toBeEnabled();
    await this.loginBtn.click();
  }
  
  async checkErrorMessage() {
    await expect(this.errorMessageField).toBeVisible();
  }
}