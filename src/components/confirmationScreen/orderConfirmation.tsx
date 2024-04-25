import { useShopContext } from "../../contexts/shopContext";
import { getTotalPrice } from "../basket/totalPrice";

function OrderConfirmation({ orderNumber }: { orderNumber: number }) {
  const { basketItems } = useShopContext();
  const totalPrice = getTotalPrice();

  const basketLines = basketItems.map((item) => (
    <tr key={item.product.id}>
      <td>
        <p>{item.product.name}</p>
      </td>
      <td>
        <p>{item.product.price * item.quantity}</p>
      </td>
      <td>
        <p>{item.quantity}</p>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <p>Thank you for your order!</p>
        <p>Your order number is: #{orderNumber}</p>
        <p>Your order details:</p>
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {basketLines}
          </tbody>
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        </table>
        <p>Your order details have been sent to your email.</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
