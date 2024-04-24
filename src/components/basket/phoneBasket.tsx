import { productLine } from "../../contexts/shopContext";
import PhoneProductLine from "./productLine/phoneProductLine";

function PhoneBasket({ basketItems }: { basketItems: productLine[] }) {
  return (
    <div className="phoneBasket">
      {basketItems &&
        basketItems.map((productLine) => {
          return (
            <PhoneProductLine
              key={productLine.product.id}
              product={productLine.product}
            />
          );
        })}
    </div>
  );
}

export default PhoneBasket;
