import { useState } from "react";
import productArray from "./product";
import { ProductLine } from "./productLine";

function Basket() {
  const [basketItems, setBasketItems] = useState(productArray);
  const handleRemoveItem = (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const getBasketAmount = () => {
    let total = 0;
    basketItems.forEach((product) => {
      total += product.price 
    });
    if (total>300){
      return total*0.9;
    }
    else return total;
};

  return (
    <>
      <h1>Checkout</h1>
      <h2>Shopping cart</h2>
      <div style={{textAlign: 'center', fontSize: '1.5em'}}  >
       Total amount { getBasketAmount().toFixed(2)}
        </div>
      {basketItems.length > 0 && (
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
                  key={product.id}
                  quantity={1} // replace with actual quantity
                  product={product}
                  handleRemoveItem={handleRemoveItem}
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
      <p>Total Price: {}</p>
      <p />
    </>
  );
}

export default Basket;
// Add this closing curly brace
