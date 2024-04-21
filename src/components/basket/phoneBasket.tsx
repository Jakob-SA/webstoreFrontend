import { Product } from "./product";
import PhoneProductLine from "./productLine/phoneProductLine";

function PhoneBasket({ basketItems }: { basketItems: Product[] }) {
  return (
    <div className="phoneBasket">
      <h2>Your basket</h2>
      {basketItems &&
        basketItems.map((product) => {
          return <PhoneProductLine key={product.id} product={product} />;
        })}
    </div>
  );
}

export default PhoneBasket;
