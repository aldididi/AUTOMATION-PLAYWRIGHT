const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
    const email = "aldidi@yopmail.com";
    const password ="Aldidi123!";
    const productName = 'ZARA COAT 3';

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(email, password);

    await dashboard.addProductToCart(productName);
    await dashboard.goToCart();

    await cart.verifyProduct(productName);
    await cart.checkout();

    await checkout.selectCountry("ind");
    await checkout.confirmAndPlaceOrder(email);

    await page.pause();
})