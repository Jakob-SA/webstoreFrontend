import { useState } from "react";
import productArray from "./product";
import { ProductLine } from "../productLine/productLine";

function Basket() {
  const [basketItems, setBasketItems] = useState(productArray);
 
  const [prices, setPrices] = useState(new Map<number, number>());
  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice variable
  const handleRemoveItem = (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
    updateTotalPrice(id, 0);
  };

  const updateTotalPrice = (productID: number, price: number) => {
    //would like this to not be stateful
    setPrices(prices.set(productID, price));
    var tempTotalPrice = 0;
    Array.from(prices.values()).forEach((price) => {
      tempTotalPrice += price;
    });
    if (tempTotalPrice > 300) {
      /*Here discount if the total price is over 300*/
      setTotalPrice(tempTotalPrice * 0.9);
    } else {
      setTotalPrice(tempTotalPrice);
    }
  };
  const calculateDiscount = (totalPrice: number) => {
    let discount = false;
    if (totalPrice > 300) {
      discount = true;
    }
    if (discount === true) {
      return (
        "With a 10% discount that means you have saved " +
        (totalPrice * 0.1).toFixed(2)
      );
    } else {
      return "You have not reached the 300 limit for a discount yet.";
    }
  };

  return (
    <>
      <div>
        {basketItems.length > 0 && (
          <table className="shoppingCart">
            <tbody>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Total </th>
                <th> </th>
                <th></th>
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
        <div>
          <h3>Total price: {totalPrice.toFixed(2)} </h3>
          <h3>{calculateDiscount(totalPrice)}</h3> {/*Should be moved*/}
        </div>
      </div>
    </>
  );
}

export default Basket;
