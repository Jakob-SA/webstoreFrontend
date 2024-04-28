import { useState } from "react";
import { RemoveButton } from "./removeButton";
import { QuantityInput } from "./quantityInput";
import "./productLine.css";
import type { ProductLine } from "../../../contexts/shopContext";

import StockElement from "./stockElement";
import { useDispatchShopContext } from "../../../contexts/useDispatchShopContext";

export function ProductLine({ productLine }: { productLine: ProductLine }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatchShopContext();

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

  const originalLinePrice = productLine.product.price * productLine.quantity;

  const totalLinePrice =
    productLine.quantity >= productLine.product.rebateQuantity
      ? originalLinePrice * (1 - productLine.product.rebatePercent / 100)
      : originalLinePrice;

  return (
    <tr className={`productLine ${isRemoving ? "removing" : ""}`}>
      <td>
        <img
          src={"productPics/product" + productLine.product.id + ".jpg"}
          className="productImages"
        />
      </td>
      <td>
        <p>{productLine.product.name}</p>
      </td>
      <td>
        <p>{productLine.product.price}</p>
      </td>
      <td>
        <QuantityInput
          quantity={productLine.quantity}
          setQuantity={updateQuantity}
          rebateQuantity={productLine.product.rebateQuantity}
        />
      </td>
      <td>
        {productLine.quantity >= productLine.product.rebateQuantity ? (
          <div className="twoLinePrice">
            <div className="oldPrice">
              <p>{originalLinePrice.toFixed(2)}</p>
            </div>
            <p>{totalLinePrice.toFixed(2)}</p>
          </div>
        ) : (
          <div className="oneLinePrice">
            <p>{totalLinePrice.toFixed(2)}</p>
          </div>
        )}
      </td>
      <td>
        <div className="lineItemGiftwrapping">
          <span>
            <input
              type="checkbox"
              id={`Giftwrapping-${productLine.product.id.toString()}`}
              onChange={updateGiftwrapping}
              checked={productLine.giftwrapping}
            />
            <label
              htmlFor={`Giftwrapping-${productLine.product.id.toString()}`}
            >
              Giftwrapping
            </label>
          </span>
          <StockElement
            stock={productLine.product.amountInStock}
            quantity={productLine.quantity}
          />
        </div>
      </td>
      <td>
        <RemoveButton onClick={() => handleRemove()} />
      </td>
    </tr>
  );
}
