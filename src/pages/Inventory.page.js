const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    productSortingList = '[data-test=product-sort-container]';

    inventoryItemName = '[data-test=inventory_item_name]';

    inventoryItemPrice = '[data-test=inventory-item-price]';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async performSortingList() {
        await this.page.locator(this.productSortingList).click();
    }

    async selectSortingOption(value) {
        await this.page.selectOption(this.productSortingList, value);
    }

    async getAllItemsName() {
        return this.page.locator(this.inventoryItemName).allTextContents();
    }

    async getAllItemsPrice() {
        return this.page.locator(this.inventoryItemPrice).allInnerTexts((price) => {
            price.flatMap((itemPrice) => itemPrice.match(/\d+(\.\d+)?/g));
        });
    }
}
