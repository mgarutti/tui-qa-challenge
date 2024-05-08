import { expect, type Locator, type Page } from '@playwright/test';

let username: string = process.env.LOGIN_USERNAME!;
let password: string = process.env.LOGIN_PASSWORD!;
let invalidAutherrorMsg = "Invalid credentials. Please try again.";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly invalidAuthErrorMessageField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username:');
    this.passwordInput = page.getByLabel('Password:');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.invalidAuthErrorMessageField = page.getByText(invalidAutherrorMsg);
  }

  async navigateToLoginPage() {
    await this.page.goto('./index.html');
  }

  async validateThatLoginPageIsDisplayed() {
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
  
  async checkInvalidCredentialsErrorMessage() {
    await expect(this.invalidAuthErrorMessageField).toBeVisible();
  }

  async loginWithValidUser() {
    await this.fillValidUserCredentials();
    await this.clickLoginButton();
  }

  async clearTextFromCredentialsField() {
    await this.usernameInput.click();
    //Control+A should work for Windows and Linux OS. For Mac, use "Meta+A"
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press('Backspace');
    await this.passwordInput.click();
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press('Backspace');
  }

}