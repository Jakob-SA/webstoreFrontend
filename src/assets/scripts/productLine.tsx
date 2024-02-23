import { useState } from "react";
import { Product } from "./product";


interface productLineProps {
    quantity: number;
    totalPrice: number;
    product: Product;
    totalRebate: number;
    inStock: boolean;
}



export function ProductLine({ quantity, product ,totalRebate, inStock }: productLineProps) {
    const [totalPrice, setTotalPrice] = useState(product.price * quantity);
    

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalPrice(product.price * parseInt(event.target.value));
        console.log("Tryk");
    }

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
            <div><input type="number" defaultValue={1} onChange={onQuantityChange}/></div>
            </td>
            <td>
            <div>{totalPrice.toFixed(2)}</div>
            </td>
            <td>
            <div><button>Remove</button></div>
            </td>
            
            
        </tr>
        
    )
}

