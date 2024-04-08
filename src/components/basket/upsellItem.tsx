import { useState, useEffect } from "react";
import { Product, fetchProducts } from "./product";
import "./basket.css";


function handleClick() {
  alert("Taking you back to the shop!");
}
export function UpsellItem() {
  const [upsellItems, setUpsellItems] = useState<Product[]>([]);
  useEffect(() => {
    //Would rather have the state of the Basket, however, we are not using Context API
    fetchProducts().then((products) => {
      setUpsellItems(products);
    }); //maybe need error handling
  }, []); // Empty array ensures this effect runs only once after initial render
  

  if (upsellItems.length === 0) {
    return <div>Loading...</div>;
  }
  
  
  return (
    //TODO: vary the displayed upsellProduct, based on the context of the basket.
    <>
      <section className="upsellItems">
        <h3>Products you might also like!</h3>
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