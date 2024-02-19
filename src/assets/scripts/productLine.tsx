import { useState } from "react";
import { Product } from "./product";


interface productLineProps {
    quantity: number;
    totalPrice: number;
    product: Product;
    totalRebate: number;
    inStock: boolean;
}


export function ProductLine({ quantity, totalPrice, product ,totalRebate, inStock }: productLineProps) {
    return (
        <div className="lineItem">
            <div>{product.name}</div>
            <div>{product.currency}</div>
            <div>{product.price}</div>
        </div>
        

    )

}