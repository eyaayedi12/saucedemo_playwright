import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";






test('Tc-001 -username correct et pass correct ',{tag:['@smoke','@tc-001']}, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage:LoginPage= new LoginPage(page);
  await loginPage.saisirUsername('standard_user');
  await loginPage.saisirPassword('secret_sauce');
  await loginPage.clicSurLogin();
  await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html'); 

});

test('Tc-002 -username incorrect et pass correct', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginPage:LoginPage= new LoginPage(page);
  await loginPage.saisirUsername('standard_user_incorrect');
  await loginPage.saisirPassword('secret_sauce');
  await loginPage.clicSurLogin();
  await expect( await loginPage.getErrorMessage()).toBeVisible();
});

