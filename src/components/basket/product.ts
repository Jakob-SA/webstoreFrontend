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
const product = getProducts
const productArray: Product[] = products;

export default productArray;

