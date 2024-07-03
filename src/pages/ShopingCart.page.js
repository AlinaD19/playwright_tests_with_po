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
}
