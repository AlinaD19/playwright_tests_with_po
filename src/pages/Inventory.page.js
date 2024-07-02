const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get productSortingList() { return this.page.locator('[data-test=product-sort-container]'); }

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get inventoryItemPrice() { return this.page.locator('[data-test=inventory-item-price]'); }

    get inventoryItemDescription() { return this.page.locator('.inventory_item_desc'); }

    async getNumberOfItems() {
        const numberOfItems = await this.inventoryItems.count();
        return numberOfItems;
    }

    async arrayOfRandomItemIndex() {
        const arrayOfRandomItemIndex = [];
        const numberPerPage = await this.getNumberOfItems();
        for (let i = 0; i < numberPerPage; i += 1) {
            const randomItem = Math.floor(Math.random() * 5);
            arrayOfRandomItemIndex.push(randomItem);
        }
        return arrayOfRandomItemIndex;
    }

    async getAllItemAddToCartButtonsId() {
        const allButtonsId = await this.addItemToCartBtns.all();
        const ids = await Promise.all(allButtonsId.map(async (element) => element.getAttribute('id')));
        return ids;
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async selectSortingOption(value) {
        await this.productSortingList.selectOption(value);
    }

    async getAllItemsName() {
        return this.inventoryItemName.allInnerTexts();
    }

    async getAllItemsPrice() {
        return this.inventoryItemPrice.allInnerTexts((price) => {
            price.map((itemPrice) => itemPrice.match(/\d+(\.\d+)?/g));
        });
    }

    async gettAllItemsDescription() {
        return this.inventoryItemDescription.allInnerTexts();
    }
}
