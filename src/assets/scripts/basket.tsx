import productArray from "./product";
import { ProductLine } from "./productLine";


function Basket() {

 return (
    <>
      <h1>Checkout</h1>
      <h2>Shopping cart</h2>
      <table className="shoppingCart">
        <tbody>
          <tr>
            <th>imgplaceholder</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
            {productArray.map((product) => {
              return (
                <ProductLine
                  key = {product.id}
                  quantity={1} // replace with actual quantity
                  totalPrice={100}
                  product={product}
                  totalRebate={0}
                  inStock={true}
                />
              );
            })}

        </tbody>
      </table>
      <p />

    </>

  );}

  export default Basket;