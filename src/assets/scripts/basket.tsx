import { useState } from "react";
import productArray from "./product";
import { ProductLine } from "./productLine";
import { UpsellItem } from "./upsellItem";

function Basket() {
  const [basketItems, setBasketItems] = useState(productArray);
  const prices = new Map<number, number>();
  const handleRemoveItem = (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  let totalPrice = 0; // Initialize totalPrice variable

  const updateTotalPrice = (productID: number, price: number) => {
    prices.set(productID, price);
    totalPrice = 0; // Reset totalPrice to 0
    prices.forEach((price) => {
      totalPrice += price; // Accumulate prices using +=
    });
  };

  return (
    <>
      {basketItems.length > 0 && (
        <table className="shoppingCart">
          <tbody>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Total </th>
              <th style={{ fontSize: "1.5em" }}>
                {"Total price: " + totalPrice.toFixed(2)}{" "}
              </th>
            </tr>
            {basketItems.map((product) => {
              return (
                <ProductLine
                  key={product.id}
                  product={product}
                  handleRemoveItem={handleRemoveItem}
                  updateTotalPrice={updateTotalPrice}
                />
              );
            })}
          </tbody>
        </table>
      )}

      {basketItems.length === 0 && (
        <p>
          No items in basket. Reload the page <a href=".">here</a> to restore
        </p>
      )}

      <p />
    </>
  );
}

export default Basket;
