import { useState } from "react";
import { Product } from "../basket/product";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  product: Product;
}

export function QuantityInput({
  quantity,
  setQuantity,
  product,
}: QuantityInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    setCoords({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className="quantityInput"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button className="quantityButton" onClick={decrementQuantity}>
        <b>-</b>
      </button>
      <input
        className="quantityBox"
        type="number"
        min="1"
        id={`Quantity-${product.id.toString()}`}
        value={quantity}
        readOnly={true} //Dont know if we want this
        /*onChange={(e) => {
          setQuantity(parseInt(e.target.value));
        }}*/
      />
      <button className="quantityButton" onClick={incrementQuantity}>
        <b>+</b>
      </button>

      {quantity < product.rebateQuantity && showTooltip && (
        <div
          className="tooltip"
          style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        >
          {"Buy at least " + product.rebateQuantity + " pairs to get a rebate"}
        </div>
      )}
    </div>
  );
}
