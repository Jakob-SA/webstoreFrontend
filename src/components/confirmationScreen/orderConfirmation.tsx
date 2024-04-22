function OrderConfirmation({ orderNumber }: { orderNumber: number }) {
  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <p>Thank you for your order!</p>
        <p>Your order number is: #{orderNumber}</p>
        <p>Your order details have been sent to your email.</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
