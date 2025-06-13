import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginModalButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly welcomeUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginModalButton = page.locator('#login2');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginSubmitButton = page.locator('button[onclick="logIn()"]');
    this.welcomeUser = page.locator('#nameofuser');
  }

  async openLoginModal() {
    await this.loginModalButton.click();
    /// await this.usernameInput.waitFor();
  }

  async fillUserName(username: string) {
    await this.usernameInput.fill(username);
  }
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async login() {
    await this.loginSubmitButton.click();
  }

  async isLoginSuccessful() {
     return await this.welcomeUser.isVisible();
  }
}
export default LoginPage;