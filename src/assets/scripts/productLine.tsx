import { useState } from "react";
import { Product } from "./product";


interface productLineProps {
    quantity: number;
    product: Product;
    handleRemoveItem: (id: number) => void;
}



export function ProductLine({ quantity, product , handleRemoveItem }: productLineProps) {
    const [totalPrice, setTotalPrice] = useState(product.price * quantity);
    const [giftwrapping, setGiftwrapping] = useState(false);
    giftwrapping.valueOf();
    

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalPrice(product.price * parseInt(event.target.value));
    }
    const onGiftwrappingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGiftwrapping(event.target.checked);
    }

    return (
        <tr>  
            <td>
                <div><img src={"src/assets/media/productPics/product" + product.id + ".jpg"} className = "productImages" width="150" height="150" /></div>
            </td> 
            <td>
                <div>{product.name}</div>
            </td>
            <td>
            <div>{product.price}</div>
            </td>
            <td>
            <div><input type="number" id={`Quantity-${product.id.toString()}`} defaultValue={1} onChange={onQuantityChange}/></div>
            </td>
            <td>
            <div>{totalPrice.toFixed(2)}</div>
            </td>
            <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>        {/*shoukd be moved*/}
                <input type="checkbox" id={`Giftwrapping-${product.id.toString()}`} onChange={onGiftwrappingChange} />
                <label htmlFor={`Giftwrapping-${product.id.toString()}`}>Giftwrapping</label>
                </div>
            </td>
            <td>
                <div><button onClick={() => handleRemoveItem(product.id)}>Remove</button></div>
            </td>
        </tr>
        
    )
}

