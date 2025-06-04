// pages/SignupPage.ts
import { Locator, Page } from '@playwright/test';
import pageURL from '../Utils/pageURLs'; 
class HomePage {
   
  private readonly signupBtn: Locator;

  constructor(private page: Page) {
    this.signupBtn = page.locator('#signin2');
  }
  async navigate() {
    await this.page.goto(pageURL.homePage);
  }

  async openSignupModal() {
    await this.signupBtn.click();
  }

}
export default HomePage;