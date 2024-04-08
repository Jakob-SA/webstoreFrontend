export interface Product {
    id: number;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: number;
    amountInStock: number;
}

import { getProducts } from '../../assets/API';

export function fetchProducts() {
  return getProducts();
}




//const productArray: Product[] = await getProducts();

/* There is problem with this code. Top level await
await getProducts().then(product => { //Copilot has helped here
  productArray = product;
}).catch(error => {
  console.error('Error:', error);
});
export default productArray;
*/


