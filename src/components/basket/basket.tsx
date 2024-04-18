import { useEffect, useState } from "react";
import { Product, fetchProducts } from "./product";
import { ProductLine } from "../productLine/productLine";
var basketDiscounted = false;

function Basket() {
  const [basketItems, setBasketItems] = useState<Product[]>([]); //maybe parameterize this
  const [prices, setPrices] = useState(new Map<number, number>());
  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice variable

  useEffect(() => {
    //copilot told me this was a fix. @Esben may find alternative fix
    fetchProducts().then((products) => {
      setBasketItems(products);
    }); //maybe need error handling
  }, []); // Empty array ensures this effect runs only once after initial render

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
    setTotalPrice(calculateDiscount(tempTotalPrice));
  };

  const displayTotalPrice = () => {
    //Should be made to actually display the whole price and not just the discount
    if (basketDiscounted) {
      return (
        "With a 10% discount that means you have saved " +
        (totalPrice / 0.9 - totalPrice).toFixed(2)
      );
    } else {
      return "You have not reached the 300 limit for a discount yet.";
    }
  };
  displayTotalPrice(); //REMOVE
  const basketLines = basketItems.map((product) => {
    return (
      <ProductLine
        key={product.id}
        product={product}
        handleRemoveItem={handleRemoveItem}
        updateTotalPrice={updateTotalPrice}
      />
    );
  });

  return (
    <>
      {basketItems.length > 0 && (
        <table>
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
            {basketLines}
          </tbody>
        </table>
      )}

      {basketItems.length === 0 && (
        <p>
          No items in basket. Reload the page <a href=".">here</a> to restore
        </p>
      )}
    </>
  );
}

function calculateDiscount(totalPrice: number): number {
  if (totalPrice > 300) {
    basketDiscounted = true;
    return totalPrice * 0.9;
  } else {
    basketDiscounted = false;
    return totalPrice;
  }
}

export default Basket;
