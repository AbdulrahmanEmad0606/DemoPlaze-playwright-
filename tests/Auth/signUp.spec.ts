// tests/auth/signup.spec.ts
import { test, expect } from '@playwright/test';
import HomePage from '../../Pages/HomePage';
import SignupPage from '../../Pages/SignupPage';
import Helpers from '../../Utils/helpers';
import messages from '../../Utils/messages';
import testData from '../../Utils/testData';
// Grouped tests 
test.describe('Signup Tests - demoblaze.com', () => {

  let homePage: HomePage;
  let signupPage: SignupPage;
  let helpers: Helpers;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    helpers = new Helpers();
    await homePage.navigate();
    await homePage.openSignupModal();
    await signupPage.waitSignupModal();
  });

  test('✅ Successful signup with unique credentials', async ({ page }) => {
    const username = helpers.generateUsername();
    await signupPage.fillUsername(username);
    await signupPage.fillPAssword('12345678');
    const alertMessagePromise = helpers.handleAlert(page);
    await signupPage.submit();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.signupMessages.successSignUpMesssage);
  });

  test('❌ Signup with existing username should fail', async ({ page }) => {
    await signupPage.fillUsername(testData.validUserName);
    await signupPage.fillPAssword(testData.validPassword);
    const alertMessagePromise = helpers.handleAlert(page);
    await signupPage.submit();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.signupMessages.existUsernameMessage);
  });

  test('❌ Signup with empty username should fail', async ({ page }) => {
    await signupPage.fillPAssword('12345678');
    const alertMessagePromise = helpers.handleAlert(page);
    await signupPage.submit();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.signupMessages.emptyUsernameAndPasswordMessage);
  });

  test('❌ Signup with empty password should fail', async ({ page }) => {
    const username = helpers.generateUsername();
    await signupPage.fillUsername(username);
    const alertMessagePromise = helpers.handleAlert(page);
    await signupPage.submit();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.signupMessages.emptyUsernameAndPasswordMessage);
  });

  test('❌ Signup with both fields empty should fail', async ({ page }) => {
    const alertMessagePromise = helpers.handleAlert(page);
    await signupPage.submit();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.signupMessages.emptyUsernameAndPasswordMessage);
  });

});
