import "./basket.css";
import { useShopContext } from "../../contexts/useShopContext";

export function UpsellItem() {
  const { products ,basketItems } = useShopContext();
  const basketItemIds = basketItems.map(item => item.product.id);
  const upsellItems = products.filter(
    product => !basketItemIds.includes(product.id)
  );
  
  if (upsellItems.length === 0 || products.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <section className="upsellItems">
        <h2>Products you might also like!</h2>
        {upsellItems.slice(0,3).map((item, index) => (
          <div key={index}>
            <img
              src={"productPics/product" + item.id + ".jpg"}
              className="productImages"
              width="150"
            />
            <p>{item.price ? item.price : 'finding price'} $</p>
            <p>{item.name}</p>
          </div>
        ))}
      </section>
    </>
  );
 
}
export default UpsellItem;
