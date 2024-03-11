import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import App from "./App"
import { ProductLine } from "./assets/scripts/productLine"
import productsData from './assets/media/products.json'
import  { Product } from './assets/scripts/product'
import { RemoveButton } from "./assets/scripts/removeButton"
import { QuantityInput } from "./assets/scripts/quantityInput"
import ZipCodeChecker from "./assets/scripts/zipCodeChecker"
import Orderform from "./assets/scripts/orderform"

describe(App.name, () => {
  test("should render", () => {
    render(<App />)
    expect(screen.getByText("Basket")).toBeInTheDocument
  })
})

describe(ProductLine.name, () => {
  test("Should decrement quantity from 3 to 2", () => {
      const product: Product = productsData[0]
      const quantity = 3
      const mockSetQuantity = vi.fn()
      render(<QuantityInput quantity={quantity} setQuantity={mockSetQuantity} product={product}/>)
      const incrementQuantity = screen.getByRole('button', { name: '-'})
      fireEvent.click(incrementQuantity)
      expect(mockSetQuantity).toHaveBeenCalledWith(2)
  })
})

describe(RemoveButton.name, () => {
  test("Should change the basketicon on hover", () => {
    render(<RemoveButton onClick={() => {}}/>)
    const button = screen.getByRole('button')
    const openTrashcanImage  = screen.getByRole('img') as HTMLImageElement
    fireEvent.mouseOver(button)
    expect(openTrashcanImage.src).toContain('openTrashcan.png')
  })
})

describe(ZipCodeChecker.name, async () => {
  test.skip("Should return as valid zipcode", () => {
    const mockFetch = vi.spyOn(window, "fetch").mockImplementation(async () => {
      return {
        json: async () => Response,
      } as Response
    })
    render(<Orderform/>)
    const form =  screen.getByTestId("zip")
    fireEvent.submit(form)
  })
})