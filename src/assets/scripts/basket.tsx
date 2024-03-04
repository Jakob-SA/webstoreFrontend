import { useState } from "react";
import productArray from "./product";
import { ProductLine } from "./productLine";

function Basket() {
  const [basketItems, setBasketItems] = useState(productArray);
  const totalPrice: number = 0; //Here we still use state. I think we need this or we will need to make changes to the components in general.
  //One could probably make another list with productsLine Objects instead of products.
  const prices = [0]; //weird
  const handleRemoveItem = (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateTotalPrice = (price: number) => {
    prices.push(price);
  };

  return (
    <>
      <h1>Checkout</h1>
      <h2>Shopping cart</h2>
      {basketItems.length > 0 && (
        <table className="shoppingCart">
          <tbody>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
            {basketItems.map((product) => {
              return (
                <ProductLine
                  key={product.id}
                  quantity={1} // replace with actual quantity
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
      <p>Total Price: {totalPrice}</p>
      <p />
    </>
  );
}

export default Basket;
