const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
    }

    async verifyProduct(productName) {
        await this.page.locator("div li").first().waitFor();
        await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };
