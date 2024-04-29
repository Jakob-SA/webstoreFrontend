import useMediaQuery from "../utils/mediaQuery";
import PhoneBasket from "./phoneBasket";
import NormalBasket from "./normalBasket";
import "./basket.css";
import { useShopContext } from "../../contexts/useShopContext";
import EmptyBasket from "./emptyBasket";

function Basket() {
  const { small } = useMediaQueries();
  const { basketLines } = useShopContext();
  if (basketLines.length === 0) {
    return <EmptyBasket />;
  }

  return (
    <>
      <h2>Your basket </h2>
      {small ? <PhoneBasket /> : <NormalBasket />}
    </>
  );
}

//This function is used to make changes in jsx based on css media queries
function useMediaQueries() {
  const small = useMediaQuery("(max-width: 970px)");

  return { small };
}

export default Basket;
