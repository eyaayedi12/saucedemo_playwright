import { Page } from "@playwright/test";


class CartPage{

    readonly page : Page;
constructor(page : Page){
    this.page=page;
}

Element={
    cartLink: () => this.page.locator('[data-test="shopping-cart-link"]'),
    continueShopping: () => this.page.locator('[data-test="continue-shopping"]'),
    checkoutShopping:()=>this.page.getByTestId('checkout')

}










}
export default CartPage;