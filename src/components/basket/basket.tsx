import useMediaQuery from "../utils/mediaQuery";
import PhoneBasket from "./phoneBasket";
import NormalBasket from "./normalBasket";
import "./basket.css";

function Basket() {
  const { small } = useMediaQueries();

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
