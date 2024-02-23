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
        <tr>   
            <th>
                <div>{product.name}</div>
            </th>


            

            <div>{product.currency}</div>
            <div>{product.price}</div>
            <div><input type="number" /></div>
        </tr>
        




        
            
        
    )
}