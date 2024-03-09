import React, { useState } from "react";
import { Product } from "./product";

interface QuantityBoxProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  product: Product;
}

export function QuantityBox({
  quantity,
  setQuantity,
  quantity,
  setQuantity,
  product,
}: QuantityBoxProps) {
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity-input">
      <button className="quantityButton" onClick={decrementQuantity}>
        <b>-</b>
      </button>
      <input
        type="number"
        min="1"
        id={`Quantity-${product.id.toString()}`}
        value={quantity}
        readOnly={true} //Dont know if we want this
        /*onChange={(e) => {
        readOnly={true} //Dont know if we want this
        /*onChange={(e) => {
          onQuantityChange(e.target.valueAsNumber);
        }}*/
        }}*/
      />
      <button className="quantityButton" onClick={incrementQuantity}>
        <b>+</b>
      </button>
    </div>
  );
}
