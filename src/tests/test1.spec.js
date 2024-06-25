const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../credentials/credentials.json');

test.describe('Test 1', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(login, password);

        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Perform and verify sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.performSortingList();
        // Verify sorting A to Z
        await inventoryPage.selectSortingOption('az');
        let itemsName = await inventoryPage.getAllItemsName();
        const sortedItemsNameAtoZ = [...itemsName].sort();

        expect(itemsName).toEqual(sortedItemsNameAtoZ);

        // Verify sorting Z to A
        await inventoryPage.selectSortingOption('za');
        itemsName = await inventoryPage.getAllItemsName();
        const sortedItemsNameZtoA = [...itemsName].sort().reverse();

        expect(itemsName).toEqual(sortedItemsNameZtoA);

        // Verify sorting low to high
        await inventoryPage.selectSortingOption('lohi');
        let itemsPrices = await inventoryPage.getAllItemsPrice();
        const sortedItemsPriceLtoH = [...itemsPrices].sort((a, b) => a - b);

        expect(itemsPrices).toEqual(sortedItemsPriceLtoH);

        // Verify sorting high to low
        await inventoryPage.selectSortingOption('hilo');
        itemsPrices = await inventoryPage.getAllItemsPrice();
        const sortedItemsPriceHtoL = [...itemsPrices].sort((a, b) => b - a);

        expect(itemsPrices).toEqual(sortedItemsPriceHtoL);
    });
});
