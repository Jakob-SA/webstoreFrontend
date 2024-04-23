import { useContext, useEffect, useState } from "react";
import { ProductLine } from "./productLine/productLine";
import useMediaQuery from "../utils/mediaQuery";
import PhoneBasket from "./phoneBasket";
import EmptyBasket from "./emptyBasket";
import NormalBasket from "./normalBasket";
import "./basket.css";
import {
  useShopContext,
  useDispatchShopContext,
} from "../../contexts/shopContext";

function Basket() {
  const { basketItems } = useShopContext();
  const dispatch = useDispatchShopContext(); //this is a fix. @Esben may find alternative fix
  //const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice variable
  //const { small } = useMediaQueries();

  /*
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
    displayTotalPrice();*/

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
    <>
      <h2>Your basket</h2>
      {/*
        {small ? (
          <PhoneBasket basketItems={basketItems} /> <--FIX THIS
        ) : (
          <NormalBasket basketLines={basketLines} /> 
        )} */}
      <NormalBasket basketLines={basketLines} />
      {basketItems.length > 0}
      {basketItems.length === 0 && <EmptyBasket />}
    </>
  );
}

//This function is used to make changes in jsx based on css media queries
function useMediaQueries() {
  const small = useMediaQuery("(max-width: 970px)");

  return { small };
}

export default Basket;
