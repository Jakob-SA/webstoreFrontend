import { useShopContext } from "../../contexts/useShopContext";
import PhoneProductLine from "./productLine/phoneProductLine";

function PhoneBasket() {
  const { basketLines } = useShopContext();
  const phoneProductLines = basketLines.map((productLine) => {
    return (
      <PhoneProductLine
        key={productLine.product.id}
        productLine={productLine}
      />
    );
  });

  return <div className="phoneBasket">{phoneProductLines}</div>;
}

export default PhoneBasket;
