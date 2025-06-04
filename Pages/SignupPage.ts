// pages/SignupPage.ts
import { Locator, Page } from '@playwright/test';
import pageURL from '../Utils/pageURLs'; 
class SignupPage {
   
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitBtn: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.submitBtn = page.locator('button[onclick="register()"]');
  }


  async waitSignupModal() {
    await this.usernameInput.waitFor();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

async fillPAssword(password: string) {
    await this.passwordInput.fill(password);
  }
  
  async submit() {
    await this.submitBtn.click();
  }

  async getAlertText(): Promise<string> {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }
}
export default SignupPage;