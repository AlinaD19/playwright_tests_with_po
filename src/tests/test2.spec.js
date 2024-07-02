const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../credentials/credentials.json');

test.describe('Test 2', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(login, password);

        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Add several random products to the Shopping Cart and verify their Name, Price and Description', async ({ inventoryPage, shopingCartPage }) => {
        // Get array of random index and create an array of unic index
        const arrayOfRandomIndex = await inventoryPage.arrayOfRandomItemIndex();
        const unicRandomIndex = [...new Set(arrayOfRandomIndex)];
        // Count how many elements per page
        let itemsOnPageAfterAdding = await inventoryPage.getNumberOfItems();

        // Perform adding random quantity of random items to the Shopping Cart
        for (let i = 0; i < unicRandomIndex.length; i += 1) {
            if (unicRandomIndex[i] < itemsOnPageAfterAdding) {
                await inventoryPage.addItemToCartById(unicRandomIndex[i]);
                itemsOnPageAfterAdding -= 1;
            }
        }
        // Count how many items were added to the Shopping Cart
        const addedItemsInCart = await inventoryPage.getNumberOfItemsInCart();
        // Verify if defined number of items are added to the Shopping Cart
        await expect(inventoryPage.shopingCartBadge).toHaveText(addedItemsInCart);

        // Collect all Names, Prices, Decriptions from Inventory Page
        const allInventoryItemsName = await inventoryPage.getAllItemsName();
        const allInventoryItemsPrice = await inventoryPage.getAllItemsPrice();
        const allInventoryItemsDescription = await inventoryPage.gettAllItemsDescription();

        await inventoryPage.shopingCart.click();
        const itemsInCart = await shopingCartPage.cartItems.count();
        expect(itemsInCart).toBeGreaterThanOrEqual(1);

        // Collect all Names, Prices, Decriptions from Shopping Cart Page
        const allCartItemsName = await shopingCartPage.getAllCartItemsName();
        const allCartItemsPrice = await shopingCartPage.getAllCartItemsPrice();
        const allCartItemsDescription = await shopingCartPage.gettAllCartItemsDescription();

        // Create an array of objects of all Items on Inventory Page
        const allInventoryItemsInformation = allInventoryItemsName.map((name, index) => ({
            name,
            price: allInventoryItemsPrice[index],
            description: allInventoryItemsDescription[index],
        }));

        // Create an array of objects of all Items on Shopping Cart page
        const allCartItemsInformation = allCartItemsName.map((name, index) => ({
            name,
            price: allCartItemsPrice[index],
            description: allCartItemsDescription[index],
        }));

        // Create an array of matches elements
        const matches = [];

        // Iterate over each element in allInventoryItemsInformation to find matching
        // among each element of allCartItemsInformation
        allInventoryItemsInformation.forEach((item1) => {
            const match = allCartItemsInformation.find((item2) => item1.name === item2.name
                && item1.price === item2.price
                && item1.description === item2.description);
            if (match) {
                matches.push(match);
            }
        });

        // Check if length of maches elements the same as items in cart
        expect(allCartItemsInformation.length).toEqual(matches.length);
    });
});
