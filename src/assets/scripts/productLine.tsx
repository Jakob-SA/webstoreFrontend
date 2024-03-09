import { useEffect, useState } from "react";
import { Product } from "./product";
import { RemoveButton } from "./removeButton";
import { QuantityBox } from "./quantityBox";
interface productLineProps {
  product: Product;
  handleRemoveItem: (id: number) => void;
  updateTotalPrice: (price: number) => void;
}

export function ProductLine({
  product,
  handleRemoveItem,
  updateTotalPrice,
}: productLineProps) {
  const [giftwrapping, setGiftwrapping] = useState(false);
  const [quantity, setQuantity] = useState(1);
  giftwrapping.valueOf(); // to be deleted

  var totalLinePrice =
    quantity >= product.rebateQuantity
      ? product.price * quantity * (1 - product.rebatePercent / 100)
      : product.price * quantity;

  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const onGiftwrappingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGiftwrapping(event.target.checked);
  };

  return (
    <tr>
      <td>
        <div className="lineItemFirst">
          <img
            src={"productPics/product" + product.id + ".jpg"}
            className="productImages"
            width="150"
            height="150"
          />
        </div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>
        <div>{product.price}</div>
      </td>
      <td>
        <div>
          <QuantityBox
            quantity={quantity}
            setQuantity={setQuantity}
            product={product}
          />
        </div>
      </td>
      <td>
        <div>{totalLinePrice.toFixed(2)}</div>
      </td>
      <td>
        <div className="lineItemGiftwrapping">
          <input
            className="giftwrappingCheckbox"
            type="checkbox"
            id={`Giftwrapping-${product.id.toString()}`}
            onChange={onGiftwrappingChange}
          />
          <label htmlFor={`Giftwrapping-${product.id.toString()}`}>
            Giftwrapping
          </label>
        </div>
      </td>

      <td>
        <div className="lineItemLast">
          <RemoveButton onClick={() => handleRemoveItem(product.id)} />
        </div>
      </td>
    </tr>
  );
}
