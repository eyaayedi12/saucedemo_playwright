import { Page } from "@playwright/test";

class MenuPage{
    readonly page : Page;
    
    constructor(page: Page){
        this.page = page;
    }

    elements={
        menuButtonElement:()=>this.page.locator('#react-burger-menu-btn'),
        logoutButtonElement:()=>this.page.locator('[data-test="logout-sidebar-link"]'),

        allitemsButtonElement:()=>this.page.locator("#inventory_sidebar_link"),
    }


    async cliquerSurmenuButton()
    {
        await this.elements.menuButtonElement().click({ timeout: 10000 });
    }

    async cliquerSurlogoutButton()
    {
        await this.elements.logoutButtonElement().click();
    }

    async cliquerSurallitemsButton()
    {
        await this.elements.allitemsButtonElement().click();
    }








}
export default MenuPage