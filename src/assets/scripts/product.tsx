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

import products from 'C:/Users/jakob/OneDrive - Danmarks Tekniske Universitet/4. semester/Frontend Web/Project/FrontendWebApp/src/assets/media/products.json';
const productArray: Product[] = products;

export default productArray;

