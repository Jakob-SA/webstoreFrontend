import "./basket.css";
import { useShopContext } from "../../contexts/shopContext";

function handleClick() {
  alert("Taking you back to the shop!");
}
export function UpsellItem() {
  const { basketItems } = useShopContext();

  const upsellItems = basketItems;

  if (upsellItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    //TODO: vary the displayed upsellProduct, based on the context of the basket.
    //Right now it is hardcoded to display the first product in the basket.
    <>
      <section className="upsellItems">
        <h3>Products you might also like!</h3>
        <img
          src={
            "productPics/product" +
            (upsellItems[0].product.id ? upsellItems[0].product.id : 0) +
            ".jpg"
          }
          className="productImages"
          width="150"
          height="150"
        />
        <ul>
          <ul>
            <b>Product </b>
            {}
          </ul>
          <ul>
            <b>
              Price{" "}
              {upsellItems[0].product.price
                ? upsellItems[0].product.price
                : upsellItems[0].product.price}
            </b>
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
