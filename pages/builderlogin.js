exports.ShoutemLogin = class ShoutemLogin {

    constructor(page) {

        //locators

        this.page = page
        this.emailField = page.getByTestId('email-form-control')
        this.passwordField = page.getByTestId('login-form-password')
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true })
        this.signInButton = page.getByRole('button', { name: 'Sign in' })
        this.invalidMail = page.getByText('Email is not valid')
        this.shortPassword = page.getByText('Password is too short')
        this.invalidPassword = page.getByText('No user with this email and password exists.')

    }

    //actions

    async gotoLoginPage() {

        await this.page.goto('https://builder.qa.shoutm.net/login');

    }

    async loginToBuilder() {

    }
}
