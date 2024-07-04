const { ShopingCartPage } = require('./ShopingCart.page');

export class CheckoutSecondPage extends ShopingCartPage {
    url = '/checkout-step-two.html';

    get headerTitle() { return this.page.locator('.title'); }

    get finishButton() { return this.page.locator('[data-test="finish"]'); }

    get checkoutItems() { return this.page.locator('.cart_item'); }

    get itemsTotal() { return this.page.locator('.summary_subtotal_label'); }

    get itemsTax() { return this.page.locator('.summary_tax_label'); }

    get orderTotalPrice() { return this.page.locator('.summary_total_label'); }

    async goToFinishCheckoutFlow() {
        await this.finishButton.click();
    }

    async getItemsTotalOnPage() {
        const itemsTotal = await this.itemsTotal.innerText();
        return itemsTotal;
    }

    async getItemsTaxOnPage() {
        const taxTotal = await this.itemsTax.innerText();
        return taxTotal;
    }

    async getOrderTotalPriceOnPage() {
        const orderTotalPrice = await this.orderTotalPrice.innerText();
        return orderTotalPrice;
    }

    async getAllCheckoutItemsPrice() {
        const allPrices = await this.iNCartItemPrice.allInnerTexts();
        return allPrices.map((price) => parseFloat(price.replace('$', '')));
    }
}
