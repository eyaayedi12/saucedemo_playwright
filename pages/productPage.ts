import { Page, Locator } from '@playwright/test';

class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements = {
    productPrice: () => this.page.locator('.inventory_item_price'),
    productItems: () => this.page.locator('.inventory_item'),
    productTitle: () => this.page.locator('.inventory_item_name'),
    addToCartButton: () => this.page.locator('.btn_inventory'),
    cartNumber: () => this.page.locator('.shopping_cart_badge'),
    cartIcon: () => this.page.locator('.shopping_cart_link'),
    productDetailTitle: () => this.page.locator('.inventory_details_name'),
    sortDropdown: () => this.page.locator('.product_sort_container'),
    ajouterAuPanierBouton: (nomProduit: string) =>
      this.page.locator(`[data-test="add-to-cart-${nomProduit}"]`),
    retirerDuPanierBouton: (nomProduit: string) =>
      this.page.locator(`[data-test="remove-${nomProduit}"]`),
  };


 tools={
    async recupererInfosProduit(product: Locator): Promise<{ name: string; price: string }> {
  const nom = await product.locator('.inventory_item_name').textContent();
  const prix = await product.locator('.inventory_item_price').textContent();

  return {
    name: nom ? nom.trim() : '',
    price: prix ? prix.trim() : ''
  };
}
//     cardTojson:async(card:any) => {
//         const
//     } 
  }

  async cliquerSurProduit(nomProduit: string) {
    await this.elements.productTitle().locator(`text=${nomProduit}`).click();
  }

  async ajouterProduitAuPanier(nomProduit: string) {
    await this.elements.ajouterAuPanierBouton(nomProduit).click();
  }

  async retirerProduitDuPanier(nomProduit: string) {
    await this.elements.retirerDuPanierBouton(nomProduit).click();
  }

  async verifierProduitAjoute() {
    await this.elements.cartNumber().waitFor({ state: 'visible' });
  }

  async verifierProduitSupprime() {
    await this.elements.cartNumber().waitFor({ state: 'detached' });
  }

  async allerAuPanier() {
    await this.elements.cartIcon().click();
  }

  async selectionnerTriPar(valeur: string) {
    await this.elements.sortDropdown().selectOption(valeur);
  }

  async verifierTriSelectionne(valeur: string) {
    await this.elements.sortDropdown().evaluate(
      (el, val) => (el as HTMLSelectElement).value === val,
      valeur
    );
  }

  async selectRandomProduct(): Promise<Locator> {
    const products = await this.elements.productItems().elementHandles();
    const randomIndex = Math.floor(Math.random() * products.length);
    return this.page.locator('.inventory_item').nth(randomIndex);
  }

  async recupererNomProduit(product: Locator): Promise<string> {
    const nom = await product.locator('.inventory_item_name').textContent();
    return nom ? nom.trim() : '';
  }

  async recupererPrixProduit(product: Locator): Promise<string> {
  const prix = await product.locator('.inventory_item_price').textContent();
  return prix ? prix.trim() : '';
}

  async verifierDetailProduit(nomProduit: string) {
    await this.elements.productDetailTitle().waitFor({ state: 'visible' });
    await this.elements.productDetailTitle().evaluate(
      (el, val) => (el.textContent?.trim() === val),
      nomProduit
    );
  }
  
}

export default ProductsPage;