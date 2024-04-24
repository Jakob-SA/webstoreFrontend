
import { ProductLine } from "./productLine/productLine";
import useMediaQuery from "../utils/mediaQuery";
import PhoneBasket from "./phoneBasket";
import EmptyBasket from "./emptyBasket";
import NormalBasket from "./normalBasket";
import "./basket.css";
import { useShopContext} from "../../contexts/shopContext";


function Basket() {
  const {basketItems} = useShopContext();
  const { small } = useMediaQueries();

  const basketLines = basketItems.map((items) => { //TODO make  updatePricework. Also handleRemoveItem
    return (
      <ProductLine
        key={items.product.id}
        quantity={items.quantity}
        product={items.product}
      
      />
    );
  });

  return (
    <>
      <h2>Your basket </h2>
      {small ? (
        <PhoneBasket basketItems={basketItems} /> //TODO: make this work! Phonebasket should take a productLine array (Jakob)
      ) : (
        <NormalBasket basketLines={basketLines} /> 
      )}
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
