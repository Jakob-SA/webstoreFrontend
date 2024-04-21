import { useEffect, useState } from "react";
import { Product } from "../product";
import { RemoveButton } from "./removeButton";
import { QuantityInput } from "./quantityInput";
import "./productLine.css";

export interface productLineProps {
  product: Product;
  handleRemoveItem: (id: number) => void;
  updateTotalPrice: (id: number, price: number) => void;
}

export function ProductLine({
  product,
  handleRemoveItem,
  updateTotalPrice,
}: productLineProps) {
  const [giftwrapping, setGiftwrapping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  giftwrapping.valueOf(); // to be deleted
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => handleRemoveItem(product.id), 300); // Animation duration
  };

  var originalLinePrice = product.price * quantity;

  var totalLinePrice =
    quantity >= product.rebateQuantity
      ? originalLinePrice * (1 - product.rebatePercent / 100)
      : originalLinePrice;

  useEffect(() => {
    updateTotalPrice(product.id, totalLinePrice);
  }, [totalLinePrice]);

  const onGiftwrappingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGiftwrapping(event.target.checked);
  };

  return (
    <tr className={`productLine ${isRemoving ? "removing" : ""}`}>
      <td>
        <img
          src={"productPics/product" + product.id + ".jpg"}
          className="productImages"
          width="150"
          height="150"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <QuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          product={product}
        />
      </td>
      <td>
        {quantity >= product.rebateQuantity ? (
          <div className="twoLinePrice">
            <div className="oldPrice">{originalLinePrice.toFixed(2)}</div>
            {totalLinePrice.toFixed(2)}
          </div>
        ) : (
          <div className="oneLinePrice">{totalLinePrice.toFixed(2)}</div>
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
