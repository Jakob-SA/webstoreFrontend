import productArray from "./product";
import { useState } from "react";

function handleClick() {
  alert("Taking you back to the shop!");
}
export function UpsellItem() {
  const [upsellItems, setUpsellItems] = useState(productArray);

  const getUpsellItemsName = (id: number) => {
    //to use later?
    upsellItems.sort((a, b) => a.id - b.id);
    let i = upsellItems[id].upsellProductId;
    return upsellItems[i].name;
  };
  setUpsellItems; //Remove
  getUpsellItemsName; // Remove
  return (
    //should not return static information
    <>
      <section className="upsellItems">
        <h2>Products you might also like!</h2>
        <img
          src={"productPics/product" + upsellItems[4].id + ".jpg"}
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
          <button onClick={handleClick}>
            {" "}
            Contiue Shopping
            <a href="."></a>{" "}
          </button>
        </ul>
      </section>
    </>
  );
}
export default UpsellItem;
