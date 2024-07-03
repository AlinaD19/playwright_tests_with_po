const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../credentials/credentials.json');

test.describe('Test three: proceed to Checkout and verify products', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(login, password);

        await expect(inventoryPage.headerTitle).toBeVisible();
    });

    test('Proceed to Checkout, place an Order and verify products', async ({
        inventoryPage, shopingCartPage, checkoutFirstPage, checkoutSecondPage,
    }) => {
        // Perform adding random quantity of random items to the Shopping Cart
        const arrayOfRandomIndex = await inventoryPage.arrayOfRandomItemIndex();
        const unicRandomIndex = [...new Set(arrayOfRandomIndex)];
        let itemsOnPageAfterAdding = await inventoryPage.getNumberOfItems();

        for (let i = 0; i < unicRandomIndex.length; i += 1) {
            if (unicRandomIndex[i] < itemsOnPageAfterAdding) {
                await inventoryPage.addItemToCartById(unicRandomIndex[i]);
                itemsOnPageAfterAdding -= 1;
            }
        }
        const addedItemsInCart = await inventoryPage.getNumberOfItemsInCart();
        await expect(inventoryPage.shopingCartBadge).toHaveText(addedItemsInCart);

        // Go to Shopping Cart and verify page
        await inventoryPage.shopingCart.click();
        await expect(shopingCartPage.headerTitle).toBeVisible();

        // Collect information of added items in shopping cart to verify details on Checout later
        const allItemInfoInCart = await shopingCartPage.collectedItems();

        // Go to First Checkout step and verify page
        await shopingCartPage.goToCheckoutStep();
        await expect(checkoutFirstPage.headerTitle).toBeVisible();

        // Fill in all required fields
        await checkoutFirstPage.firstNameField.fill('Rayan');
        await checkoutFirstPage.lastNameField.fill('Gosling');
        await checkoutFirstPage.zipCodeField.fill('12345');

        // Go to Second Checkout step and verify page
        await checkoutFirstPage.goToSecondCheckputStep();
        await expect(checkoutSecondPage.headerTitle).toBeVisible();

        // Collect information of items on checkout
        const allItemInfoCheckout = await checkoutSecondPage.collectedItems();

        // Verify: products (Name, Description, and Price values)
        expect(allItemInfoInCart).toEqual(allItemInfoCheckout);

        // Verify Total Order Price
        const subtotalItemsPrice = await checkoutSecondPage.getItemsTotalOnPage();
        const totalItemsTax = await checkoutSecondPage.getItemsTaxOnPage();
        const totalOrderPrice = await checkoutSecondPage.getOrderTotalPriceOnPage();
        expect(parseFloat((subtotalItemsPrice + totalItemsTax).toFixed(2))).toEqual(parseFloat(totalOrderPrice));

        // Finish flow
        await checkoutSecondPage.goToFinishCheckoutFlow();
    });
});
