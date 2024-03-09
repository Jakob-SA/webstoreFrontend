import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import App from "./App"
import { ProductLine } from "./assets/scripts/productLine"
import productsData from './assets/media/products.json'
import  { Product } from './assets/scripts/product'

describe(App.name, () => {
  test("should render", () => {
    render(<App />)
    expect(screen.getByText("Checkout")).toBeInTheDocument()
  })
})

describe(ProductLine.name, () => {
    test("Price of 2 loafers should show correct total: 161.98", () => { //With 10% rebate
        const product: Product = productsData[0]
        const quantity = 2
        const totalPrice = (product.price * quantity * (1 - product.rebatePercent / 100)).toFixed(2)
        render(<ProductLine quantity={quantity} product={product} handleRemoveItem={() => {}} updateTotalPrice={() => {}}/>)
        expect(screen.getByText(totalPrice)).toBeInTheDocument()
    })
})