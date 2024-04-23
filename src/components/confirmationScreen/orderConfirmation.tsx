import React from "react";
import {
  useShopContext,
  useDispatchShopContext,
} from "../../contexts/shopContext";
import { ProductLine } from "../basket/productLine/productLine";
import NormalBasket from "../basket/normalBasket";

function OrderConfirmation({ orderNumber }: { orderNumber: number }) {
  const { basketItems } = useShopContext();
  const dispatch = useDispatchShopContext();

  const basketLines = basketItems.map((items) => {
    //TODO make  updatePricework. Also handleRemoveItem
    return (
      <ProductLine
        key={items.product.id}
        product={items.product}
        handleRemoveItem={() =>
          dispatch({ type: "REMOVE_FROM_BASKET", productId: items.product.id })
        }
        updateTotalPrice={() =>
          dispatch({
            type: "UPDATE_TOTAL_PRICE",
            productId: items.product.id,
            price: items.product.price,
          })
        }
      />
    );
  });

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <p>Thank you for your order!</p>
        <p>Your order number is: #{orderNumber}</p>
        <p>Your order details:</p>
        <NormalBasket basketLines={basketLines} />

        <p>Your order details have been sent to your email.</p>
      </div>
    </div>
  );
}

export default OrderConfirmation;
