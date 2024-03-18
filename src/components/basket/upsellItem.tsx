import productArray from "./product";
import { useState } from "react";

function handleClick() {
  alert("Are you sure you want to checkout?");
}
export function UpsellItem() {
  const [upsellItems, setUpsellItems] = useState(productArray);
  

  
 if (upsellItems.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    //should not return static information
    <>
      <section className="upsellItems">
        <h2>Products you might also like!</h2>
        <img
          src={"productPics/product" + upsellItems[0].id + ".jpg"}
          className="productImages"
          width="150"
          height="150"
        />
        <ul>
          <ul>
            <b>Product </b>
            {upsellItems[4].name}
          </ul>
          <ul>
            <b>Price {upsellItems[4].price}</b>
          </ul>
          <button onClick={() => { handleClick() }}>
            {" "}
            Continue Shopping
            <a href="."></a>{" "}
          </button>
        </ul>
      </section>
    </>
  );
}
export default UpsellItem;
