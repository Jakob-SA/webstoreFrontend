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
            <td>
                <div>Image</div>
            </td> 
            <td>
                <div>{product.name}</div>
            </td>
            <td>
            <div>{product.price}</div>
            </td>
            <td>
            <div><input type="number" defaultValue={1} /></div>
            </td>
            <td>
            <div>{totalPrice}</div>
            </td>
            <td>
            <div><button>Remove</button></div>
            </td>
            
            
        </tr>
        
    )
}