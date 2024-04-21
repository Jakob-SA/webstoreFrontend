function OrderSummary() {
  return (
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div>
        <p>Subtotal</p>
        <p>100 $</p>
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
    </div>
  );
}

export default OrderSummary;
