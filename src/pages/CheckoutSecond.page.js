const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutSecondPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    get headerTitle() { return this.page.locator('.title'); }

    get finishButton() { return this.page.locator('[data-test="finish"]'); }

    get checkoutItems() { return this.page.locator('.cart_item'); }

    get itemsTotal() { return this.page.locator('.summary_subtotal_label'); }

    get itemsTax() { return this.page.locator('.summary_tax_label'); }

    get orderTotalPrice() { return this.page.locator('.summary_total_label'); }

    get checkoutItemName() { return this.page.locator('.inventory_item_name'); }

    get checkoutItemPrice() { return this.page.locator('.inventory_item_price'); }

    get checkoutItemDescription() { return this.page.locator('.inventory_item_desc'); }

    async goToFinishCheckoutFlow() {
        await this.finishButton.click();
    }

    async getItemsTotalOnPage() {
        return this.itemsTotal.innerText();
    }

    async getItemsTaxOnPage() {
        return this.itemsTax.innerText();
    }

    async getOrderTotalPriceOnPage() {
        return this.orderTotalPrice.innerText();
    }

    async getAllCheckoutItemsPrice() {
        return this.checkoutItemPrice.allInnerTexts();
    }

    async getAllCheckoutItemsName() {
        return this.checkoutItemName.allInnerTexts();
    }

    async gettAllCheckoutItemsDescription() {
        return this.checkoutItemDescription.allInnerTexts();
    }

    // Method is create to collect name, decription and price into one object with relates properties
    async collectedItems() {
        const names = await this.getAllCheckoutItemsName();
        const prices = await this.getAllCheckoutItemsPrice();
        const descriptions = await this.gettAllCheckoutItemsDescription();

        const allItemsInformation = [];

        for (let i = 0; i < names.length; i += 1) {
            const item = {
                name: names[i],
                price: prices[i],
                description: descriptions[i],
            };
            allItemsInformation.push(item);
        }
        return allItemsInformation;
    }
}
