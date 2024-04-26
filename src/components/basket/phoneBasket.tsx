import { ProductLine } from "../../contexts/shopContext";
import PhoneProductLine from "./productLine/phoneProductLine";

function PhoneBasket({ basketItems }: { basketItems: ProductLine[] }) {
  return (
    <div className="phoneBasket">
      {basketItems &&
        basketItems.map((productLine) => {
          return (
            <PhoneProductLine
              key={productLine.product.id}
              productLine={productLine}
            />
          );
        })}
    </div>
  );
}

export default PhoneBasket;
