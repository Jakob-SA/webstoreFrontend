import "./basket.css";
import { ShopContext, useShopContext } from "../../contexts/shopContext";

function handleClick() {
  alert("Taking you back to the shop!");
}

export function UpsellItem() {
  const { products ,basketItems } = useShopContext();

  const upsellItems = basketItems;
  const basketItemIds = basketItems.map(item => item.product.id);
  
  const nums = products
      .map((product, index) => (basketItemIds.includes(product.id) ? 0 : index))
      .filter(index => index !== 0); //copilot helped 
     
      console.log(products)
      console.log(nums)

  if (upsellItems.length === 0 || products.length === 0) {
    return <div>Loading... + </div>;
  }


   let item1 = nums[0]
   let item2 = nums[1]
     


  return (
    //TODO: vary the displayed upsellProduct, based on the context of the basket.
    //Right now it is hardcoded to display the first product in the basket.
    <>
      <section className="upsellItems">
        <h3>Products you might also like!</h3>
        <img
          src={
            "productPics/product" +
            item2 +
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
              {products[item2].price ? products[item2].price : products[1].price}
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
