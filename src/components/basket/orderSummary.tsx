import { Link } from "react-router-dom";

import { getShippingCost, getTotalPrice } from "./totalPrice";
function OrderSummary() {
  const totalPrice = getTotalPrice();
  const shippingCost = getShippingCost();
  const showWarning = totalPrice < 300; // Check if total price is less than 300

  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div>
        <b>Subtotal</b>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <div>
        <b>Shipping</b>
        <p>${shippingCost.toFixed(2)}</p>
      </div>
      <div>
        <b>Total</b>
        <p>${totalPrice.toFixed(2)}</p>
      </div>

      {showWarning && (
        <p
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          Free shipping for orders over $300!
        </p>
      )}

      <Link to="/delivery">
        <button className="summary-button">
          Proceed to delivery <p style={{ fontSize: "4em" }}>&#187;</p>
        </button>
      </Link>
    </div>
  );
}

export default OrderSummary;
