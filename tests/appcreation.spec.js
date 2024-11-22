import { test, expect } from '@playwright/test';
import { ShoutemLogin } from '../pages/builderlogin';
import { appMainPage } from '../pages/appmainpage';
import { BuilderPage } from '../pages/buildermainpage';


require('dotenv').config();

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


test('should create new app and verify sidebar navigation', async ({ page }) => {

    const Builderpage = new BuilderPage(page)
    const appmainpage = new appMainPage(page)

    const sideBarLinks = [
        "Screens",
        "Style",
        "Analytics",
        "Push",
        "Settings",
        "Extensions",
        "Help",
    ]

    await Builderpage.createNewApp();

    await expect(appmainpage.sideBarMenu.first()).toBeVisible()
    expect(await appmainpage.sideBarMenu.allInnerTexts()).toEqual(sideBarLinks)


});