const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    get iNCartItemName() { return this.page.locator('.inventory_item_name'); }

    get iNCartItemPrice() { return this.page.locator('.inventory_item_price'); }

    get iNCartItemDescription() { return this.page.locator('.inventory_item_desc'); }

    get checkoutButton() { return this.page.locator('[data-test="checkout"]'); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getAllCartItemsName() {
        return this.iNCartItemName.allInnerTexts();
    }

    async getAllCartItemsPrice() {
        return this.iNCartItemPrice.allInnerTexts();
    }

    async gettAllCartItemsDescription() {
        return this.iNCartItemDescription.allInnerTexts();
    }

    async goToCheckoutStep() {
        await this.checkoutButton.click();
    }

    async getNumberOfItemsInCart() {
        const numberOfItems = await this.cartItems.count();
        return numberOfItems;
    }

    async collectedItems() {
        const names = await this.getAllCartItemsName();
        const prices = await this.getAllCartItemsPrice();
        const descriptions = await this.gettAllCartItemsDescription();

        const allItemsInformation = [];

        // Assuming names, prices, and descriptions arrays have the same length
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
