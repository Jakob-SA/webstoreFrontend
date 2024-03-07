import productArray from "./product";
import { ProductLine } from "./productLine";
import { useState } from "react";

export function UpsellItem() {
    const [upsellItems, setupsellItems] = useState(productArray);

    const getUpsellItemsName = (id: number) => {    
        let i = productArray[id].upsellProductId
        return productArray[i].name;
    }
    return (
        <>
            <table className="upsellItems">
                <tbody>
                    <tr>
                    <th><img src={"productPics/product" + productArray[0].upsellProductId + ".jpg"} className = "productImages" width="150" height="150"  />
                    </th>
                        <th>Why not also buy</th>
                        <th>{getUpsellItemsName(0)}</th>
                        <th>Price</th>
                        
                    </tr>
                    
                    
                </tbody>
            </table>
        </>
    );
}
export default UpsellItem;