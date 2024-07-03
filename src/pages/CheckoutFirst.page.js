const { BasePage } = require('./Base.page');

export class CheckoutFirstPage extends BasePage {
    url = '/checkout-step-one.html';

    get headerTitle() { return this.page.locator('.title'); }

    get firstNameField() { return this.page.locator('[placeholder="First Name"]'); }

    get lastNameField() { return this.page.locator('[placeholder="Last Name"]'); }

    get zipCodeField() { return this.page.locator('[placeholder="Zip/Postal Code"]'); }

    get continueButton() { return this.page.locator('[data-test="continue"]'); }

    async goToSecondCheckputStep() {
        await this.continueButton.click();
    }
}
