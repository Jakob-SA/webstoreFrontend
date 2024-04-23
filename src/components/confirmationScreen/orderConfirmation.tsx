import React from "react";
import {
  useShopContext,
  useDispatchShopContext,
} from "../../contexts/shopContext";
import { ProductLine } from "../basket/productLine/productLine";
import NormalBasket from "../basket/normalBasket";

function OrderConfirmation({ orderNumber }: { orderNumber: number }) {
  const { basketItems } = useShopContext();

  const basketLines = basketItems.map((item) => (
    <tr key={item.product.id}>
      <td>
        <p>{item.product.name}</p>
      </td>
      <td>
        <p>{item.product.price}</p>
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
              <th>Price per unit</th>
              <th>Quantity</th>
            </tr>
            {basketLines}
          </tbody>
        </table>
        <p>Your order details have been sent to your email.</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
