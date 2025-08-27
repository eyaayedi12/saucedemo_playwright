import { test, expect, Page } from '@playwright/test';
import LoginPage from "../pages/loginPage";
import ProductsPage from '../pages/productPage';





test.describe('Ajouter des produits', () => {
  let page: Page;
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await page.goto('https://www.saucedemo.com/');

    await loginPage.saisirUsername('standard_user');
  await loginPage.saisirPassword('secret_sauce');
    await loginPage.clicSurLogin();

    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });

  test('Tc005 -Ajoute un produit au panier et vérifie son nom et son prix  dans le panier',{tag:['@smoke','@tc-005']}, async () => {
    const product = await productsPage.selectRandomProduct();
    const nomProduit = await productsPage.recupererNomProduit(product);
    const prixProduit=await productsPage.recupererPrixProduit(product);
    const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');

    await productsPage.ajouterProduitAuPanier(nomFormate);
    await productsPage.allerAuPanier();

    await expect(page.locator('.inventory_item_name')).toContainText(nomProduit);
    await expect(page.locator('.inventory_item_price')).toContainText(prixProduit);
  });
    test('Tc006 -Ajouter plusieurs  produit au panier et vérifie sa présence dans le panier',{tag:['@smoke','@tc-006']} ,async () => {
    
        const addedproductsnames:string[]=[];
        const addedproductsprices:string[]=[];

        for(let i =0;i<3;i++){
            const product = await productsPage.selectRandomProduct();
            const nomProduit = await productsPage.recupererNomProduit(product);
            const prixProduit = await productsPage.recupererPrixProduit(product);


            if(!addedproductsnames.includes((nomProduit))){

                const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');

                await productsPage.ajouterProduitAuPanier(nomFormate);
                addedproductsnames.push(nomProduit);
                addedproductsprices.push(prixProduit);

            }
            else{
                i--;
            }

        }
    
    
    await productsPage.allerAuPanier();
    const productnamesincart= await page.locator('[data-test="inventory-item-name"]').allTextContents();
    const productPricesincart=await productsPage.elements.productPrice().allTextContents();
     for (const nom of addedproductsnames) {
    await expect.soft(productnamesincart).toContain(nom);
  }
     for (const price of addedproductsprices) {
    await expect.soft(productPricesincart).toContain(price);
  }
  });
      
    
    
test('Tc007 - Supprimer un produit du panier et vérifier sa suppression', async () => {
  const product = await productsPage.selectRandomProduct();
  const nomProduit = await productsPage.recupererNomProduit(product);
  const nomFormate = nomProduit.toLowerCase().replace(/\s+/g, '-');

  await productsPage.ajouterProduitAuPanier(nomFormate);
  await productsPage.allerAuPanier();

  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(nomProduit);
  await productsPage.retirerProduitDuPanier(nomFormate);
  await expect(page.locator('[data-test="inventory-item-name"]', { hasText: nomProduit })).toHaveCount(0);
});

//     test('Tc008 -Ajouter plusieurs  produit au panier et vérifie sa présence dans le panier',{tag:['@smoke','@tc-006']} ,async () => {
    
//         const addedproducts:{name:string,price:string}[]= [];
//         const addedproductsnames:string[]=[];
//         const addedproductsprices:string[]=[];

//         for(let i =0;i<3;i++){
//             const product = await productsPage.selectRandomProduct();
//             const productinfos = await productsPage.tools.recupererInfosProduit(product);
//             // const nomProduit = await productsPage.recupererNomProduit(product);
//             // const prixProduit = await productsPage.recupererPrixProduit(product);


//             if(!addedproducts.includes((productinfos))){

//                 const nomFormate = productinfos.name.toLowerCase().replace(/\s+/g, '-');

//                 await productsPage.ajouterProduitAuPanier(nomFormate);
//                 addedproducts.push(productinfos);
             

//             }
//             else{
//                 i--;
//             }

//         }
    
    
//     await productsPage.allerAuPanier();
//     const productnamesincart= await page.locator('[data-test="inventory-item-name"]').allTextContents();
//     const productPricesincart=await productsPage.elements.productPrice().allTextContents();
//      for (const nom of addedproductsnames) {
//     await expect.soft(productnamesincart).toContain(nom);
//   }
// })






//  test.afterEach(async () => {
//     await page.close();
//   });

});
