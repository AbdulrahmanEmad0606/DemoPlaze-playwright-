// pages/SignupPage.ts
import { Locator, Page } from '@playwright/test';
import pageURL from '../Utils/pageURLs';
import testData from '../Utils/testData';
class HomePage {

  private readonly signupBtn: Locator;
  private readonly loginBtn: Locator;
  private readonly welcomeUser : Locator;
  constructor(private page: Page) {
    this.signupBtn = page.locator('#signin2');
    this.loginBtn = page.getByRole('link', { name: 'Log in' });
    this.welcomeUser  = page.locator('#nameofuser');
  }
  async navigate() {
    await this.page.goto(pageURL.homePage);
  }

  async openSignupModal() {
    await this.signupBtn.click();
  }
  async openLoginModal() {
    await this.loginBtn.click();
  }

 async getWelcomeText() {
    return await this.welcomeUser.textContent();
  }


}


export default HomePage;