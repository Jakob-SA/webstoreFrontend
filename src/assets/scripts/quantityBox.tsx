import React, { useState } from "react";

export function QuantityBox({
  product,
  onQuantityChange,
}: {
  product: any;
  onQuantityChange: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1);
    onQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity: number) => prevQuantity - 1);
      onQuantityChange(quantity - 1);
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
        onChange={(e) => {
          setQuantity(e.target.valueAsNumber);
          onQuantityChange(e.target.valueAsNumber);
        }}
      />
      <button className="quantityButton" onClick={incrementQuantity}>
        <b>+</b>
      </button>
    </div>
  );
}
