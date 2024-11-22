import { test, expect } from '@playwright/test';
import { ShoutemLogin } from '../pages/builderlogin';


require('dotenv').config();


test.describe('Login scenarios', () => {

    test.beforeEach(async ({ page }) => {

        const Login = new ShoutemLogin(page)


        await Login.gotoLoginPage();
        await Login.emailField.click();
        await expect(Login.emailField).toBeEditable();

    })

    test('Login to builder with existing email and password', async ({ page }) => {

        const Login = new ShoutemLogin(page)

        await Login.emailField.fill(process.env.EMAIL);
        await expect(Login.continueButton).toBeVisible();
        await Login.continueButton.click();
        await Login.passwordField.click();
        await expect(Login.passwordField).toBeEditable()
        await Login.passwordField.fill(process.env.PASSWORD);
        await Login.signInButton.click();
        await expect(page).toHaveURL('https://builder.qa.shoutm.net/apps')

    });


    test('User is trying to login with invalid email', async ({ page }) => {

        const Login = new ShoutemLogin(page)

        await Login.emailField.fill(process.env.INVALID_EMAIL);
        await expect(Login.continueButton).toBeVisible();
        await Login.continueButton.click();
        await expect(Login.invalidMail).toHaveText('Email is not valid');

    });

    test('User is trying to login with too short password', async ({ page }) => {

        const Login = new ShoutemLogin(page)

        await Login.emailField.fill(process.env.EMAIL);
        await expect(Login.continueButton).toBeVisible();
        await Login.continueButton.click();
        await Login.passwordField.click();
        await expect(Login.passwordField).toBeEditable()
        await Login.passwordField.fill(process.env.SHORT_PASSWORD);
        await expect(Login.signInButton).toBeVisible()
        await Login.signInButton.click();
        await expect(Login.shortPassword).toHaveText('Password is too short');

    });

    test('User is trying to login with invalid password', async ({ page }) => {

        const Login = new ShoutemLogin(page)

        await Login.emailField.fill(process.env.EMAIL);
        await expect(Login.continueButton).toBeVisible();
        await Login.continueButton.click();
        await Login.passwordField.click();
        await expect(Login.passwordField).toBeEditable()
        await Login.passwordField.fill(process.env.INVALID_PASSWORD);
        await expect(Login.signInButton).toBeVisible()
        await Login.signInButton.click();
        await expect(Login.invalidPassword).toHaveText('No user with this email and password exists.');

    });

})