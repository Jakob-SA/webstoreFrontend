import { useState, useEffect } from "react";
import { Product, fetchProducts } from "./product";
import "./basket.css";

function handleClick() {
  alert("Taking you back to the shop!");
}
export function UpsellItem() {
  const [upsellItems, setUpsellItems] = useState<Product[]>([]);
  useEffect(() => {
    //copilot told me this was a fix.
    fetchProducts().then((products) => {
      setUpsellItems(products);
    }); //maybe need error handling
  }, []); // Empty array ensures this effect runs only once after initial render

  if (upsellItems.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    //should not return static information
    <>
      <section className="upsellItems">
        <h2>Products you might also like!</h2>
        <img
          src={"productPics/product" + upsellItems[0].upsellProductId + ".jpg"}
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
          <button
            className="continueShoppingButton"
            onClick={() => {
              handleClick();
            }}
          >
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
