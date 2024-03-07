import { useEffect, useState } from "react";
import { Product } from "./product";
import { RemoveButton } from "./removeButton";
import { QuantityBox } from "./quantityBox";
interface productLineProps {
  quantity: number;
  product: Product;
  handleRemoveItem: (id: number) => void;
  updateTotalPrice: (price: number) => void;
}

export function ProductLine({
  quantity,
  product,
  handleRemoveItem,
  updateTotalPrice,
}: productLineProps) {
  const [giftwrapping, setGiftwrapping] = useState(false);
  const [antal, setQuantity] = useState(quantity);
  giftwrapping.valueOf(); // to be deleted

  var totalLinePrice =
    antal >= product.rebateQuantity
      ? product.price * antal * (1 - product.rebatePercent / 100)
      : product.price * antal;

  useEffect(() => {
    updateTotalPrice(totalLinePrice);
  }, [totalLinePrice]);

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (newValue < 1) {
      setQuantity(1);
    } else {
      setQuantity(newValue);
    }
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
            product={product}
            onQuantityChange={() => onQuantityChange}
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
