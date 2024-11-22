import { test, expect } from '@playwright/test';
import { ShoutemLogin } from '../pages/builderlogin';
import { BuilderHeader } from '../pages/builderheader';
import { BuilderPage } from '../pages/buildermainpage';

require('dotenv').config();

test.describe.configure({ mode: 'serial' }); // --> works only for this test, does not override global settings

test.describe('should test out app creation, app rename, app copy and app deletion features', () => {

  test.beforeEach(async ({ page }) => {

    const Login = new ShoutemLogin(page)

    await Login.gotoLoginPage()
    await Login.emailField.fill(process.env.EMAIL);
    await expect(Login.continueButton).toBeVisible();
    await Login.continueButton.click();
    await Login.passwordField.click();
    await expect(Login.passwordField).toBeEditable()
    await Login.passwordField.fill(process.env.PASSWORD);
    await Login.signInButton.click();
    await expect(page).toHaveURL('https://builder.qa.shoutm.net/apps')

  })
  test('should create new app and go back to My Application page', async ({ page }) => {

    const Builderpage = new BuilderPage(page)
    const Builderheader = new BuilderHeader(page)

    await Builderpage.createNewApp();
    await Builderheader.goToMainPage();

  });

  test('should rename first app on the list', async ({ page }) => {

    const Builderpage = new BuilderPage(page)

    await Builderpage.renameFirstApp();


  })

  test('should make a copy of first app on list', async ({ page }) => {

    const Builderpage = new BuilderPage(page)

    await Builderpage.copyFirstApp();


  })

  test('should delete first app on list', async ({ page }) => {

    const Builderpage = new BuilderPage(page)

    await Builderpage.deleteFirstApp();


  })


})



