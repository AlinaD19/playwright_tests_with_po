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

    // eslint-disable-next-line class-methods-use-this
    async extractNumberFromStr(str) {
        const match = str.match(/\$([\d.]+)/);
        let number;
        if (match) {
            const numberString = match[1];
            number = parseFloat(numberString);
        }
        return number;
    }

    /* async getNumberOfItemsOnCheckout() {
        const numberOfItems = this.checkoutItems.count();
        return numberOfItems;
    } */

    async getItemsTotalOnPage() {
        const itemsTotal = await this.itemsTotal.innerText();
        const price = this.extractNumberFromStr(itemsTotal);
        return price;
    }

    async getItemsTaxOnPage() {
        const taxTotal = await this.itemsTax.innerText();
        const price = this.extractNumberFromStr(taxTotal);
        return price;
    }

    async getOrderTotalPriceOnPage() {
        const orderTotalPrice = await this.orderTotalPrice.innerText();
        const price = this.extractNumberFromStr(orderTotalPrice);
        return price;
    }

    async getAllCheckoutItemsPrice() {
        const allPrices = await this.iNCartItemPrice.allInnerTexts();
        return allPrices.map((price) => parseFloat(price.replace('$', '')));
    }
}
