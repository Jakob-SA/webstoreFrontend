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

import products from '../../assets/media/products.json';
import { getProducts } from '../../assets/API';
import exp from 'constants';



export function productArray() {
let productArray: Product[] = [];
getProducts().then(product => {
  productArray = product;
  console.log(productArray);
}).catch(error => {
  console.error('Error:', error);
});
return productArray;
}

export default productArray;