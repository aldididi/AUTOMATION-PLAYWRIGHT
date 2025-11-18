class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
    }

    async addProductToCart(productName) {
        await this.page.locator(".card-body b").first().waitFor();
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const name = await this.products.nth(i).locator("b").textContent();
            if (name === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async goToCart() {
        await this.page.locator("[routerlink*='cart']").click();
    }
}

module.exports = { DashboardPage };
