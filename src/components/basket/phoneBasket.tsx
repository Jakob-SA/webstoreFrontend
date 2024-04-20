import { Product } from "./product";
import PhoneProductLine from "./productLine/phoneProductLine";

function PhoneBasket({ basketItems }: { basketItems: Product[] }) {
  return (
    <>
      <h1>Phone Basket</h1>
      <p>
        This is the phone basket. If you are on a small screen, you will see
        this instead of the full basket.
      </p>
      {basketItems &&
        basketItems.map((product) => {
          return <PhoneProductLine key={product.id} product={product} />;
        })}
    </>
  );
}

export default PhoneBasket;
