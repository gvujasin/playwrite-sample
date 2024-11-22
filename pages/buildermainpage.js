const { expect } = require("@playwright/test")

exports.BuilderPage = class BuilderPage {

    constructor(page) {

        //locators

        this.page = page
        this.myApplicationTitle = page.getByTestId('apps-page-title')
        this.createAppButton = page.getByTestId('create-app-button')
        this.firstAppOnList = page.locator('div.app-info-list > div > ul > li:nth-child(2)')
        this.firstAppMenu = page.locator('.app-info-list-item:nth-child(2) > div > span')
        this.renameButton = page.locator('.open.btn-group > ul > li:nth-child(1)')
        this.makeACopyOption = page.locator('.open.btn-group > ul > li:nth-child(2)')
        this.deleteOption = page.locator('.open.btn-group > ul > li:nth-child(3)')
        this.renameButtonConfirm = page.locator('button.btn.btn-primary')
        this.copyButtonConfirm = page.locator('.modal-footer div.loader-container')
        this.deleteButtonConfirm = page.locator('.modal-footer div.loader-container')
        this.homepageLink = page.getByRole('link', { name: 'Home' })
        this.developersLink = page.getByRole('link', { name: 'Developers' })
        this.supportLink = page.getByRole('link', { name: 'Support' })
        this.createAppHeader = page.getByRole('heading', { name: 'Create your app' })
        this.firstAppTemplate = page.locator('li').filter({ hasText: /^News app$/ }).locator('div').nth(3)
        this.loadedBuilder = page.getByTestId('app-builder-body')
        this.renameTextbox = page.getByRole('textbox')
        this.successfullyDeletedMessage = page.getByText('App successfully deleted!')




    }

    //actions

    async createNewApp() {

        await this.createAppButton.click()
        await expect(this.createAppHeader).toHaveText('Create your app')
        await this.firstAppTemplate.click()
        await expect(this.loadedBuilder).toBeVisible()

    }

    async renameFirstApp() {

        let date = Date.now();

        await this.firstAppMenu.click()
        await this.renameButton.click()
        await this.renameTextbox.fill("Date is" + " " + date)
        await this.renameButtonConfirm.click()
        await expect(this.firstAppOnList).toContainText('Date is')

    }

    async copyFirstApp() {

        await this.firstAppMenu.click()
        await this.makeACopyOption.click()
        await this.copyButtonConfirm.click()
        await expect(this.loadedBuilder).toBeVisible()


    }

    async deleteFirstApp() {
        await this.firstAppMenu.click()
        await this.deleteOption.click()
        await this.deleteButtonConfirm.click()
        await expect(this.successfullyDeletedMessage).toHaveText('App successfully deleted!')

    }


}