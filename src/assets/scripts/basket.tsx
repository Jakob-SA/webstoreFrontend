import { useState } from "react";
import productArray from "./product";
import { ProductLine } from "./productLine";






function Basket() {
  const [basketItems, setBasketItems] = useState(productArray);

  const handleRemoveItem = (id : number) => {
    setBasketItems(prevItems => prevItems.filter(item => item.id !== id));
  }

 return (
    <>
      <h1>Checkout</h1>
      <h2>Shopping cart</h2>
      <table className="shoppingCart">
        <tbody>
          <tr>
            <th>imgplaceholder</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
            {basketItems.map((product) => {
              return (
                <ProductLine
                  key = {product.id}
                  quantity={1} // replace with actual quantity
                  product={product}
                  handleRemoveItem={handleRemoveItem}
                />
              );
            })}

        </tbody>
      </table>
      <p />

    </>

  );}

  export default Basket;