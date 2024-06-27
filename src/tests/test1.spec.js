const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../credentials/credentials.json');

test.describe('Test 1', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(login, password);

        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Perform and verify A to Z sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption('az');
        const itemsNameAtoZ = await inventoryPage.getAllItemsName();
        const sortedItemsNameAtoZ = [...itemsNameAtoZ].sort();

        expect(itemsNameAtoZ).toEqual(sortedItemsNameAtoZ);
    });

    test('Perform and verify Z to A sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption('za');
        const itemsNameZtoA = await inventoryPage.getAllItemsName();
        const sortedItemsNameZtoA = [...itemsNameZtoA].sort().reverse();

        expect(itemsNameZtoA).toEqual(sortedItemsNameZtoA);
    });

    test('Perform and verify Low to High sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption('lohi');
        const itemsPricesLtoH = await inventoryPage.getAllItemsPrice();
        const sortedItemsPriceLtoH = [...itemsPricesLtoH].sort((a, b) => a - b);

        expect(itemsPricesLtoH).toEqual(sortedItemsPriceLtoH);
    });

    test('Perform and verify High to Low sorting on the Inventory page', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption('hilo');
        const itemsPricesHtoL = await inventoryPage.getAllItemsPrice();
        const sortedItemsPriceHtoL = [...itemsPricesHtoL].sort((a, b) => b - a);

        expect(itemsPricesHtoL).toEqual(sortedItemsPriceHtoL);
    });
});
