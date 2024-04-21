import { useState } from "react";
import { Product } from "../product";

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
  const toolTipMessage =
    "Buy at least " + product.rebateQuantity + " pairs to get a rebate";
  const [illigalQuantity, setIlligalQuantity] = useState(false);

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

  const decrementQuantity = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setIlligalQuantity(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setIlligalQuantity(false);
    }
  };

  return (
    <div
      className="quantityInput"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button className="quantityButton" onClick={decrementQuantity}>
        <p>-</p>
      </button>
      <div className="quantityBox">{quantity}</div>
      <button className="quantityButton" onClick={incrementQuantity}>
        <p>+</p>
      </button>

      {quantity < product.rebateQuantity && showTooltip && (
        <div
          className="tooltip"
          style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        >
          {illigalQuantity
            ? "Use the trashbin to remove the product."
            : toolTipMessage}
        </div>
      )}
    </div>
  );
}
