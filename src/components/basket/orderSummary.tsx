import { Link } from "react-router-dom";

import { getTotalPrice } from "./totalPrice";
function OrderSummary() {
  const totalPrice = getTotalPrice();
  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div>
        <p>Subtotal</p>
        <p>{totalPrice.toFixed(2)}</p>
      </div>
      <div>
        <p>Shipping</p>
        <p>
          <i>calculated at next step</i>
        </p>
      </div>
      <div>
        <p>
          <b>Total</b>
        </p>
        <div style={{ display: "flex" }}>
          <p>USD </p>
          <b>{totalPrice.toFixed(2)}</b>
        </div>
      </div>
      <Link to="/delivery">
        <button className="summary-button">
          Proceed to delivery <p style={{ fontSize: "4em" }}>&#187;</p>
        </button>
      </Link>
    </div>
  );
}

export default OrderSummary;
