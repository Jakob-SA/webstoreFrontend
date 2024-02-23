import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import productArray from './assets/scripts/product'
import product from './assets/scripts/product'
import { ProductLine } from './assets/scripts/productLine'

const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

productArray.forEach((product) => {
  console.log(product.name);
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {productArray.map((product,i) => {
  return (
    <ProductLine key={i}
      quantity={1} // replace with actual quantity
      totalPrice={100}
      product={product}
      totalRebate={0}
      inStock={true}
    />
  );
  })}


    productLine
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
      </tr>
      <tr>
        <td>
          <img
            className="productImages"
            src="src/assets/Media/banana-for-scale-sticker.jpg"
            alt="Billede af banan"
          />
        </td>
        <td>{productArray[1].name}</td>
        <td id="price">
          <div>
            {productArray[1].price }
          </div>
        </td>
        <td>
        <input id="antal" name="age" type="number" />
          
        </td>
        <td id="total" />
      </tr>
    </tbody>
  </table>
  <p />
  
</>
       
  )
}


export default App
