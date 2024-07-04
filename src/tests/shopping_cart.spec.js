const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../credentials/credentials.json');
const { arrayOfRandomItemIndex } = require('../utils/methods.page');

test.describe('Test two: add products to cart and verify them', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(login, password);

        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Add several random products to the Shopping Cart and verify their Name, Price and Description', async ({ inventoryPage, shopingCartPage }) => {
        // Perform adding random quantity of random items to the Shopping Cart
        const unicRandomIndex = arrayOfRandomItemIndex(await inventoryPage.getNumberOfItems());
        for (let i = 0; i < unicRandomIndex.length; i += 1) {
            await inventoryPage.addItemToCartById(unicRandomIndex[i]);
        }
        // Verify if defined number of items are added to the Shopping Cart
        const addedItemsInCart = await inventoryPage.getNumberOfItemsInCart();
        await expect(inventoryPage.shopingCartBadge).toHaveText(addedItemsInCart);

        // Collect all Names, Prices, Decriptions from Inventory Page to compare them with data in Shopping Cart
        const allInventoryItemsInformation = await shopingCartPage.collectedItems();

        await inventoryPage.shopingCart.click();

        // Collect all Names, Prices, Decriptions from Shopping Cart Page
        const allCartItemsInformation = await shopingCartPage.collectedItems();

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

        // Check if an array of items in the cart is the same as already found matching items
        expect(allCartItemsInformation).toEqual(expect.arrayContaining(matches));
    });
});
