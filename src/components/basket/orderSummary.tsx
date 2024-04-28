import { Link } from "react-router-dom";
import { getShippingCost, useTotalPrice, useDiscountAmount } from "./totalPrice";
function OrderSummary() {
  const totalPrice = useTotalPrice();
  const shippingCost = getShippingCost();
  const showWarning = totalPrice < 300; // Check if total price is less than 300

  const discountAmount = useDiscountAmount();
  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div>
        <p>Subtotal</p>
        <p>{totalPrice.toFixed(2)} $</p>
      </div>
      <div>
      {totalPrice >= 300 
        ? <p>Congratulations! You get a 10% discount! You have saved: {discountAmount.toFixed(2)}</p>
        : <p>You are {(300 - totalPrice).toFixed(2)} $ away from getting a 10% discount!</p>}
       </div>
    <div>
        <p>Shipping</p>
        <p>
          <i>10 $</i>
        </p>
      </div> 
      <div>
        <p>
          <b>Total</b>
        </p>
        <div style={{ display: "flex" }}>
          <b>{(10+totalPrice).toFixed(2)} $</b>
        </div>
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
