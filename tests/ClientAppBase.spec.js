const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
    const email = "aldidi@yopmail.com";
    const password ="Aldidi123!";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const web = page.goto("https://rahulshettyacademy.com/client");
    const checkoutButton = page.locator("text=Checkout");
    const country = page.locator("[placeholder*='Country']")
    const emailCheckout = page.locator(".user__name [type='text']");
    const placeOrder = page.locator(".action__submit");
    const cvv = page.locator('input').nth(2);
    const name = page.locator('input').nth(3);
    const cuopon = page.locator('input').nth(4);
    const downloadCsv = page.locator('button').nth(0);

   await web;
   await emailField.fill(email);
   await passwordField.fill(password);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i=0; i<count; ++i){
   if (await products.nth(i).locator("b").textContent()==productName){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
   }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();

   await checkoutButton.click();
   await country.pressSequentially("ind", {delay:100});
   const dropDown = page.locator(".ta-results");    
   await dropDown.waitFor();
   const optionsCount = await dropDown.locator("button").count();
   for(let i=0; i<optionsCount; ++i){
       const text = await dropDown.locator("button").nth(i).textContent();
        if(text.trim() === "Indonesia"){
            await dropDown.locator("button").nth(i).click();
            break;
        }

   }

await cvv.fill("341");
await name.fill("aldy");
//await cuopon.fill("rahul");
expect(emailCheckout.first()).toHaveText(email);
await placeOrder.click();
const title = await page.locator(".title:has-text('ZARA COAT 3')").isVisible();
await downloadCsv.click();
await page.pause();
 
})