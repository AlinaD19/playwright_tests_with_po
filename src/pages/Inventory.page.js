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

    async getAllInventoryItemsName() {
        return this.inventoryItemName.allInnerTexts();
    }

    async getAllInventoryItemsPrice() {
        return this.inventoryItemPrice.allInnerTexts((price) => {
            price.map((itemPrice) => itemPrice.match(/\d+(\.\d+)?/g));
        });
    }

    async gettAllInventoryItemsDescription() {
        return this.inventoryItemDescription.allInnerTexts();
    }

    // Method is create to collect name, decription and price into one object with relates properties
    async collectedItems() {
        const names = await this.getAllInventoryItemsName();
        const prices = await this.getAllInventoryItemsPrice();
        const descriptions = await this.gettAllInventoryItemsDescription();

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
