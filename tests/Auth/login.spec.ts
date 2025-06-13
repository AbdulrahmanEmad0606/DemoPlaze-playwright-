import { test, expect } from '@playwright/test';
import LoginPage from '../../Pages/LoginPage';
import HomePage from '../../Pages/HomePage';
import Helpers from '../../Utils/helpers';
import testData from '../../Utils/testData';
import messages from '../../Utils/messages';
test.describe('Login Tests - demoblaze.com', () => {
  let homePage: HomePage;
  let helpers: Helpers;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    helpers = new Helpers();
    loginPage = new LoginPage(page);
    await homePage.navigate();
    await loginPage.openLoginModal();
  });

  test('✅ Login with valid credentials', async ({ page }) => {
    await loginPage.fillUserName(testData.validUserName);
    await loginPage.fillPassword(testData.validUserName);
    await loginPage.login();
    expect(loginPage.isLoginSuccessful()).toBeTruthy();
  });

  test('❌ Invalid username, valid password', async ({ page }) => {
    await loginPage.fillUserName(testData.invalidUsername);
    await loginPage.fillPassword(testData.invalidPassword);
    await loginPage.login();
    const alertMessagePromise = helpers.handleAlert(page);
    const message = await alertMessagePromise;
    expect(message).toContain(messages.loginMessages.userDoesNotExistMessage);
  });
  test('❌ Valid username, invalid password', async ({ page }) => {
    await loginPage.fillUserName(testData.validPassword);
    await loginPage.fillPassword(testData.invalidPassword);
    await loginPage.login();
    const alertMessagePromise = helpers.handleAlert(page);
    const message = await alertMessagePromise;
    expect(message).toContain(messages.loginMessages.wrongPasswordMessage);
  });
  test('❌ Empty username and password', async ({ page }) => {
    await loginPage.fillUserName(testData.emptyUsername);
    await loginPage.fillPassword(testData.emptyPassword);
    const alertMessagePromise = helpers.handleAlert(page);
    await loginPage.login();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.loginMessages.emptyFieldsMessage);
  });

  test('❌ Empty username only', async ({ page }) => {

    await loginPage.fillUserName(testData.emptyUsername);
    await loginPage.fillPassword(testData.validPassword);
    const alertMessagePromise = helpers.handleAlert(page);
    await loginPage.login();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.loginMessages.emptyFieldsMessage);
  });
  test('❌ Empty password only', async ({ page }) => {
    await loginPage.fillUserName(testData.validUserName);
    await loginPage.fillPassword(testData.emptyPassword);
    const alertMessagePromise = helpers.handleAlert(page);
    await loginPage.login();
    const message = await alertMessagePromise;
    expect(message).toContain(messages.loginMessages.emptyFieldsMessage);
  });

});