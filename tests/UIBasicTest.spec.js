
const {test, expect} = require('@playwright/test');
const { console } = require('inspector');

test('browser setup', async ({browser}) =>
{
    //set chrome 

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password =  page.locator("[type='password']");
    const loginBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademyWrong");
    await password.fill("learning"); 
    await loginBtn.click(); 

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await loginBtn.click();
    console.log(await cardTitles.first().textContent());
    //or:
    console.log(await cardTitles.nth(3).textContent());
   const allTitles =( await cardTitles.allTextContents());
   console.log(allTitles);
});

test('user control', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password =  page.locator("[type='password']");
    const loginBtn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const radioBtn = page.locator(".radiotextsty");
    const checkBox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await  page.locator(".radiotextsty").last().isChecked());
    expect(radioBtn.last()).toBeChecked();
   
    await checkBox.click();
    expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");  
    //await page.pause();
    

});