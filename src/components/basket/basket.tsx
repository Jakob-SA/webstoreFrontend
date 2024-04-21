import { useContext, useEffect, useState } from "react";
import { ProductLine } from "../productLine/productLine";
import { ShopContext, useDispatchShopContext } from "../../contexts/shopContext";
import { useShopContext } from "../../contexts/shopContext";
import { fetchProducts } from "../basket/product.ts";


function Basket() {
  const {basketItems,totalPrice} = useShopContext();
  const dispatch = useDispatchShopContext()//this is a fix. @Esben may find alternative fix
  //const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice variable
  
  const displayTotalPrice = () => {
    //Should be made to actually display the whole price and not just the discount
    if (totalPrice>300) {
      return (
        "With a 10% discount that means you have saved " +
        (totalPrice / 0.9 - totalPrice).toFixed(2)
      );
    } else {
      return "You have not reached the 300 limit for a discount yet.";
    }
  };

  const basketLines = basketItems.map((products) => { //TODO make  updatePricework. Also handleRemoveItem
    return (
      <ProductLine
        key={products.id}
        product={products}
        handleRemoveItem={()=> dispatch({type: 'REMOVE_FROM_BASKET', productId: products.id})} 
        updateTotalPrice={()=> dispatch({type: 'UPDATE_TOTAL_PRICE',productId: products.id, price: products.price})} 
      />
    );
  });

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
              {basketLines}
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
          <h3>{displayTotalPrice()}</h3> {/*Should be moved*/}
        </div>
      </div>
    </>
  );
}



export default Basket;
