import productArray from "./product";
import { ProductLine } from "./productLine";
import { useState } from "react";

export function UpsellItem() {
    const [upsellItems, setupsellItems] = useState(productArray);

    const getUpsellItems = () => {
        
    }
    return (
        <>
            
            <table className="UpsellItems" width={0.5}>
                <tbody>
                    <tr>
                        <th>imgplaceholder</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                        
                    </tr>
                    <img src={"productPics/product" + upsellItems[0].id + ".jpg"} className = "productImages" width="150" height="150"  />
                    {upsellItems[0].upsellProductId}
                    
                </tbody>
            </table>
        </>
    );
}
export default UpsellItem;