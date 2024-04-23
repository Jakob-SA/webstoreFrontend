import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../contexts/shopContext";

function OrderSummary() {
  const { subtotal } = useContext(ShopContext);

  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div>
        <p>Subtotal</p>
        <p>{`$${subtotal.toFixed(2)}`}</p>
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
          <b>Price</b>
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
