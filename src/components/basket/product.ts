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





let productArray: Product[] = [];

await getProducts().then(product => {
  productArray = product;
}).catch(error => {
  console.error('Error:', error);
});
export default productArray;


