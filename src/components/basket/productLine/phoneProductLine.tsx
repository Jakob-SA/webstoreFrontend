import { useState } from "react";
import {
  ProductLine,
  useDispatchShopContext,
} from "../../../contexts/shopContext";
import "./phoneProductLine.css";
import { QuantityInput } from "./quantityInput";
import { RemoveButton } from "./removeButton";

function PhoneProductLine({ productLine }: { productLine: ProductLine }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatchShopContext();

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(
      () =>
        dispatch({
          type: "REMOVE_FROM_BASKET",
          productId: productLine.product.id,
        }),
      300
    ); // Animation duration
  };
  return (
    <section className="phoneProductLine">
      <img
        src={"productPics/product" + productLine.product.id + ".jpg"}
        className="productImages"
        width="150"
        height="150"
      />
      <div>
        <h3>{productLine.product.name}</h3>
        <p>Price: {productLine.totalLinePrice.toFixed(2)} $</p>
        <div className="spaceBetween">
          <QuantityInput
            quantity={productLine.quantity}
            setQuantity={() => {}}
            product={productLine.product}
          />
          <RemoveButton onClick={handleRemove} />
          {/* FIX ANIMATION IN CSS CLASS */}
        </div>
      </div>
    </section>
  );
}

export default PhoneProductLine;
