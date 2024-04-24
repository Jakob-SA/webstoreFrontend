import { useEffect, useState } from "react";
import { Product } from "../product";
import { RemoveButton } from "./removeButton";
import { QuantityInput } from "./quantityInput";
import "./productLine.css";
import { useDispatchShopContext, useShopContext } from "../../../contexts/shopContext";

export interface productLineProps {
  product: Product;
  quantity: number;
  
}

export function ProductLine({
  product,
  quantity,
  //updateTotalPrice,
}: productLineProps) {
  const [giftwrapping, setGiftwrapping] = useState(false);
  //const [quantity, setQuantity] = useState(1);
  //const quantity = basketItems.find(item => item.product.id === product.id)?.quantity || 1;
  giftwrapping.valueOf(); // to be deleted
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatchShopContext();

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() =>  dispatch({
    type: 'REMOVE_FROM_BASKET',
    productId: product.id}), 300); // Animation duration
    console.log("Removing item");
  };
  const updateQuantity = (newQuantity: number) =>{
    dispatch({
    type: 'UPDATE_ITEM_QUANTITY',
    productId: product.id,
    quantity: newQuantity})
  }

  var originalLinePrice = product.price * quantity;

  var totalLinePrice =
    quantity >= product.rebateQuantity
      ? originalLinePrice * (1 - product.rebatePercent / 100)
      : originalLinePrice;

 /* useEffect(() => {
    updateTotalPrice(product.id, totalLinePrice);
    console.log("Total price updated" + totalLinePrice);
  }, [totalLinePrice]);
*/

  const onGiftwrappingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGiftwrapping(event.target.checked);
  };

  return (
    <tr className={`productLine ${isRemoving ? "removing" : ""}`}>
      <td>
        <img
          src={"productPics/product" + product.id + ".jpg"}
          className="productImages"
        />
      </td>
      <td>
        <p>{product.name}</p>
      </td>
      <td>
        <p>{product.price}</p>
      </td>
      <td>
        <QuantityInput
          quantity={quantity}
          setQuantity={updateQuantity}
          product={product}
        />
      </td>
      <td>
        {quantity >= product.rebateQuantity ? (
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
          <input
            type="checkbox"
            id={`Giftwrapping-${product.id.toString()}`}
            onChange={onGiftwrappingChange}
          />
          <label htmlFor={`Giftwrapping-${product.id.toString()}`}>
            Giftwrapping
          </label>
        </div>
      </td>
      <td>
        <RemoveButton onClick={() => handleRemove()} />
      </td>
    </tr>
  );
}
