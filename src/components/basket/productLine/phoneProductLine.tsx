import { useState } from "react";
import "./phoneProductLine.css";
import { QuantityInput } from "./quantityInput";
import { RemoveButton } from "./removeButton";
import { ProductLine } from "../../../contexts/shopContext";
import { useDispatchShopContext } from "../../../contexts/useDispatchShopContext";
import StockElement from "./stockElement";

function PhoneProductLine({ productLine }: { productLine: ProductLine }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatchShopContext();
  isRemoving && console.log("Removing product", productLine.product.id);
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(
      () =>
        dispatch({
          type: "REMOVE_FROM_BASKET",
          productId: productLine.product.id,
        }),
      300
    ); // Animation duration
  };
  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      productId: productLine.product.id,
      quantity: newQuantity,
    });
  };
  const updateGiftwrapping = () => {
    dispatch({
      type: "UPDATE_GIFTWRAPPING",
      productId: productLine.product.id,
      giftwrapping: !productLine.giftwrapping,
    });
  };

  return (
    <section className={`phoneProductLine ${isRemoving ? "removing" : ""}`}>
      <img
        src={"productPics/product" + productLine.product.id + ".jpg"}
        className="productImages"
        width="150"
        height="150"
      />
      <div>
        <h3>{productLine.product.name}</h3>
        <div className="spaceBetween">
          <p>Price: {productLine.totalLinePrice.toFixed(2)} $</p>
          <label htmlFor={`Giftwrapping-${productLine.product.id.toString()}`}>
            Giftwrapping:
            <input
              type="checkbox"
              id={`Giftwrapping-${productLine.product.id.toString()}`}
              onChange={updateGiftwrapping}
              checked={productLine.giftwrapping}
            />
          </label>
        </div>
        <div className="spaceBetween">
          <QuantityInput
            quantity={productLine.quantity}
            setQuantity={updateQuantity}
            rebateQuantity={productLine.product.rebateQuantity}
          />
          <StockElement
            stock={productLine.product.amountInStock}
            quantity={productLine.quantity}
          />
          <RemoveButton onClick={handleRemove} />
          {/* FIX ANIMATION IN CSS CLASS */}
        </div>
      </div>
    </section>
  );
}

export default PhoneProductLine;
