import { useShopContext } from "../../contexts/useShopContext";
import {
  getShippingCost,
  useTotalPrice,
  calculateDiscount,
  useDiscountAmount,
} from "../basket/totalPrice";
import "./orderConfirmation.css";

function OrderConfirmation() {
  const { basketLines: basketItems } = useShopContext();
  const price = useTotalPrice();
  const currentDate = new Date();
  const shippingCost = getShippingCost();
  const subtotalPrice = calculateDiscount(price) + shippingCost;
  const discount = useDiscountAmount();

  const basketSummary = basketItems.map((item) => (
    <tr key={item.product.id} className="confirmation-basket-row">
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
          <div className="product-price-giftwrap">
            <p className="product-price">
              {(item.product.price * item.quantity).toFixed(2)} $
            </p>
            <em style={{ fontSize: "0.8em" }}>
              {item.giftwrapping ? "Giftwrapped" : ""}
            </em>
          </div>
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

        <div>
          <div className="orderInfo-container">
            <div className="order-date">
              Order Date: {currentDate.getDate()}/{currentDate.getMonth()}/
              {currentDate.getFullYear()}
            </div>
            <div className="order-status">Order Status: Pending</div>
          </div>
          <table>
            <tbody>{basketSummary}</tbody>
          </table>
          <div className="order-total-border-top">
            <section className="order-total">
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Subtotal:</p>
                <p>{price.toFixed(2)} $</p>
              </div>
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Discount:</p>
                <p> - {discount.toFixed(2)} $</p>
              </div>
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Shipping:</p>
                <p> {shippingCost.toFixed(2)} $</p>
              </div>
              <div className="order-total-subclass">
                <p className="order-total-subclass-text">Total:</p>
                <p> {subtotalPrice.toFixed(2)} $</p>
              </div>
            </section>
          </div>
        </div>

        <p className="confirmation-message">
          Your order details have been sent to your email.
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
