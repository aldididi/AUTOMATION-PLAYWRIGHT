const { expect } = require('@playwright/test');


class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.emailCheckout = page.locator(".user__name [type='text']");
        this.placeOrder = page.locator(".action__submit");
    }

    async selectCountry(name) {
        await this.country.pressSequentially(name, { delay: 100 });
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();

        const options = dropdown.locator("button");
        const count = await options.count();

        for (let i = 0; i < count; i++) {
            if ((await options.nth(i).textContent()).trim() === "Indonesia") {
                await options.nth(i).click();
                break;
            }
        }
    }

    async confirmAndPlaceOrder(email) {
        await expect(this.emailCheckout.first()).toHaveText(email);
        await this.placeOrder.click();
    }
}

module.exports = { CheckoutPage };
