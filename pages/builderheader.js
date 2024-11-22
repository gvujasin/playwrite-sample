exports.BuilderHeader = class BuilderHeader {

    constructor(page) {

        //locators

        this.page = page
        this.brandLogo = page.getByTestId('builder-brand-logo')
        this.pageTitle = page.getByTestId('apps-page-title')
        this.accountMenu = page.locator('ul:nth-child(4)')
        this.supportMenu = page.locator('ul:nth-child(5)')
        this.myAccountSection = page.getByRole('menuitem', { name: ' My Account' })
        this.becomeADeveloperSection = page.getByRole('menuitem', { name: ' Become a developer' })
        this.signOut = page.getByRole('menuitem', { name: ' Become a developer' })
        this.supportSection = page.getByRole('menuitem', { name: ' Support' })
        this.contactUsSection = page.getByRole('menuitem', { name: ' Contact us' })
    }

    //actions

    async goToMainPage() {
        await this.brandLogo.click()
    }


}