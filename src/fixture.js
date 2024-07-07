import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { InventoryPage } from './pages/Inventory.page';
import { ShopingCartPage } from './pages/ShopingCart.page';
import { CheckoutFirstPage } from './pages/CheckoutFirst.page';
import { CheckoutSecondPage } from './pages/CheckoutSecond.page';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shopingCartPage: async ({ page }, use) => {
        await use(new ShopingCartPage(page));
    },

    checkoutFirstPage: async ({ page }, use) => {
        await use(new CheckoutFirstPage(page));
    },

    checkoutSecondPage: async ({ page }, use) => {
        await use(new CheckoutSecondPage(page));
    },
});
