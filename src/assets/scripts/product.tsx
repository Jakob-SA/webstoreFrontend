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

import products from './products.json';
const productArray: Product[] = products;

export default productArray;

