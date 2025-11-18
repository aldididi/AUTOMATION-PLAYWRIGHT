const { test, expect } = require('@playwright/test');
class LoginPage{
    constructor(page){
        this.page = page;
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = { LoginPage };
