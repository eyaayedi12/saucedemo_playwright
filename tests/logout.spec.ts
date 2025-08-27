import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import { beforeEach } from 'node:test';
import MenuPage from '../pages/menuPage';

// let loginPage: LoginPage;
// let menuPage : MenuPage;

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   loginPage = new LoginPage(page);
// })

test("Tc-003 -verifier le logout",async({page})=> {
    await page.goto('https://www.saucedemo.com/');
  const loginPage:LoginPage= new LoginPage(page);
    const menuPage: MenuPage = new MenuPage(page);
  await loginPage.saisirUsername('standard_user');
  await loginPage.saisirPassword('secret_sauce');
    await loginPage.clicSurLogin();
 
    await menuPage.cliquerSurmenuButton();
    await menuPage.cliquerSurlogoutButton();
    await expect(page.locator('.login_logo')).toBeVisible();
})