import { fireEvent, getByTestId, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, test, vi } from "vitest"
import App from "./App"
import { ProductLine } from "./assets/scripts/productLine"
import productsData from './assets/media/products.json'
import  { Product } from './assets/scripts/product'
import { RemoveButton } from "./assets/scripts/removeButton"
import { QuantityInput } from "./assets/scripts/quantityInput"
import Orderform from "./assets/scripts/orderform"
import mockResponse from "./assets/media/mockResponse.json"

describe(App.name, () => {
  test("should render", () => {
    render(<App />)
    expect(screen.getByText("Basket")).toBeInTheDocument
  })
})

describe(ProductLine.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
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

describe(Orderform.name, () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test.skip("Should return the corrosponding city for zip code", async () => {
    const user = userEvent.setup()
    const mockFetch = vi.spyOn(window, "fetch").mockImplementation(async () => {
      return {
        json: async () => mockResponse,
      } as Response
    })

    render(<Orderform/>)
    
    const zipCodeInput = screen.getByLabelText("Zip Code:")
    await user.type(zipCodeInput, "2200")
    const form = screen.getByTestId("zip-data-form")
    fireEvent.submit(form)
    
    await screen.findByText("København N")
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.dataforsyningen.dk/postnumre/2200"
    )
  })
})

describe(ProductLine.name, () => {
  test("Should remove the item", () => {
    let mockBasketItems = [
      {id: 1, name: 'produc1', price: 100}, 
      {id: 2, name: 'produc2', price: 100}
    ]
    const product: Product = productsData[0]
    const handleRemoveItem = (productId: number) => {
      mockBasketItems = mockBasketItems.filter(item => item.id !== productId);
    };
    render(<ProductLine product={product} handleRemoveItem={() => handleRemoveItem(product.id)} updateTotalPrice={() => {}}/>);
    const removeIcon = screen.getByAltText('Remove icon');
    const button = removeIcon.closest('button');
    if (button) fireEvent.click(button);
    expect(mockBasketItems.length).toBe(1);
  });
})