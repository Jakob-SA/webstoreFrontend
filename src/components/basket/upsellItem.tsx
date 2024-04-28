import "./upsellItem.css";
import { useShopContext } from "../../contexts/useShopContext";

export function UpsellItem() {
  const { products, basketLines } = useShopContext();
  const basketItemIds = basketLines.map((item) => item.product.id);
  const upsellItems = products.filter(
    (product) => !basketItemIds.includes(product.id)
  );

  if (upsellItems.length === 0 || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Products you might also like!</h2>
        <section className="upsellItemsContainer">
          {upsellItems.slice(0, 3).map((item, index) => (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src={"productPics/product" + item.id + ".jpg"}
                    className="upsellImages"
                    width="150"
                  />
                  <div className="upsellItemInformation">
                    <p>{item.name}</p>
                    <p>{item.price ? item.price : "finding price"} $</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <button onClick={() => {}}>ADD TO BASKET</button>
                  <img
                    src={"productPics/product" + item.id + ".jpg"}
                    className="upsellImages"
                    width="150"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
export default UpsellItem;
