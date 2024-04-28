import { useShopContext } from "../../contexts/useShopContext";
import { getShippingCost, getTotalPrice } from "../basket/totalPrice";
import "./orderConfirmation.css";

function OrderConfirmation({ orderNumber }: { orderNumber: number }) {
  const { basketLines: basketItems } = useShopContext();
  const subtotalPrice = getTotalPrice();
  const currentDate = new Date();
  const shippingCost = getShippingCost();
  const totalPrice = subtotalPrice + shippingCost;

  const basketSummary = basketItems.map((item) => (
    <tr key={item.product.id}>
      <td>
        <div className="product-details">
          <img
            src={"productPics/product" + item.product.id + ".jpg"}
            className="product-images"
          />
          <div className="product-name-quantity">
            <p className="product-name">{item.product.name}</p>
            <div className="product-quatity">
              <p className="quantity-label">Qty:</p>
              <p>{item.quantity}</p>
            </div>
          </div>
          <p className="product-price">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <p className="confirmation-message">Thank you for your order!</p>
        <p className="confirmation-message">Your order details:</p>

        <section>
          <div className="orderInfo-container">
            <div className="order-date">
              Order Date: {currentDate.getDate()}/{currentDate.getMonth()}/
              {currentDate.getFullYear()}
            </div>
            <div className="order-number">Order Number: {orderNumber}</div>
          </div>
          {basketSummary}
          <div className="order-total-border-top">
            <section className="order-total">
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Subtotal:</p>
                <p>${subtotalPrice.toFixed(2)}</p>
              </div>
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Shipping:</p>
                <p> ${shippingCost.toFixed(2)}</p>
              </div>
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Total:</p>
                <p> ${totalPrice.toFixed(2)}</p>
              </div>
            </section>
          </div>
        </section>

        <p className="confirmation-message">
          Your order details have been sent to your email.
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
