import { useState } from "react";
import { Product } from "../product";

export function QuantityTooltip(product: Product) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: { clientX: any; clientY: any }) => {
    setCoords({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div>
      <img
        src={"questionmark.jpg"}
        alt="Tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width="20"
        height="20"
      />
      {showTooltip ? null : null}

      <div
        className="tooltip"
        style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
      >
        {"Buy at least " + product.rebateQuantity + " pairs to get a rebate"}
      </div>
    </div>
  );
}
