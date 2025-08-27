
import { Page } from "@playwright/test";

class CheckoutStepOnePage {

 readonly page : Page;
    
    constructor(page: Page){
        this.page = page;
    }

    elements={
        firstname: () => this.page.locator('[data-test="firstName"]'),
        lastName: () => this.page.locator('[data-test="lastName"]'),
        postalCode: () => this.page.locator('[data-test="postalCode"]'),
        continueButton: () => this.page.locator('[data-test="continue"]'),
        cancelButton: () => this.page.locator('[data-test="cancel"]')

    }


    /////Actions 

    async saisirFirstName(firstName: string){
        await this.elements.firstname().fill(firstName);
    }
    async saisirLastName(lastName: string){
        await this.elements.lastName().fill(lastName);
    }
    async startcheckout(firstName: string, lastName: string){
        await this.elements.firstname().fill(firstName);
        await this.elements.lastName().fill(lastName);
        await this.elements.continueButton().click();
    }

    async cancelCheckout(){
        await this.elements.cancelButton().click();
    }



}
export default CheckoutStepOnePage;









