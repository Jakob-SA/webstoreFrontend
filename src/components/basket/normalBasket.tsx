import { useShopContext } from "../../contexts/useShopContext";
import { ProductLine } from "./productLine/productLine";

function NormalBasket() {
  const { basketLines } = useShopContext();
  const productLines = basketLines.map((productLine) => {
    return (
      <ProductLine key={productLine.product.id} productLine={productLine} />
    );
  });

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            <p id="name">Product</p>
          </th>
          <th>
            <p>Price per unit</p>
          </th>
          <th>
            <p>Quantity</p>
          </th>
          <th>
            <p>Total</p>
          </th>
          <th> </th>
          <th></th>
        </tr>
        {productLines}
      </tbody>
    </table>
  );
}
export default NormalBasket;
