import productArray from "./product";
import { ProductLine } from "./productLine";
import { useState } from "react";

export function UpsellItem() {
    const [upsellItems, setUpsellItems] = useState(productArray);

    const getUpsellItemsName = (id: number) => {    
        upsellItems.sort((a, b) => a.id - b.id);
        let i = upsellItems[id].upsellProductId
        return upsellItems[i].name;
    }
    return (
        <>
            <section className="upsellItems">
                
                <h2>Products you may like!</h2>
                 <img src={"productPics/product" + upsellItems[1].upsellProductId + ".jpg"} className = "productImages" width="150" height="150"  />
                 <ul>
                    <ul>
                        <b>Product </b>
                        {getUpsellItemsName(1)}
                    </ul>
                    <ul>
                        <b>Price {
                        upsellItems[3].price}</b>
                        
                    </ul>
                 </ul>
                
                        

                    
                    
                    
                
            </section>
        </>
    );
}
export default UpsellItem;