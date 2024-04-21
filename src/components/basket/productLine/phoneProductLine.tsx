import { Product } from "../product";
import "./phoneProductLine.css";
import { QuantityInput } from "./quantityInput";
import { RemoveButton } from "./removeButton";

function PhoneProductLine({ product }: { product: Product }) {
  return (
    <section className="phoneProductLine">
      <img
        src={"productPics/product" + product.id + ".jpg"}
        className="productImages"
        width="150"
        height="150"
      />
      <div>
        <h3>{product.name}</h3>
        <p>Price: {product.price} $</p>
        <div className="spaceBetween">
          <QuantityInput
            quantity={1}
            setQuantity={() => {}}
            product={product}
          />
          <RemoveButton onClick={() => {}} />
        </div>
      </div>
    </section>
  );
}

export default PhoneProductLine;
