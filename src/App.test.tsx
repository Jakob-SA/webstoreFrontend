import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";
import { ProductLine } from "./assets/scripts/productLine";
import productsData from './assets/media/products.json';
import  { Product } from './assets/scripts/product';

describe(App.name, () => {
  test("should render", () => {
    render(<App />);
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});

describe(ProductLine.name, () => {
    test("Should show correct total: 179.98", () => {
        const product: Product = productsData[0]
        const quantity = 2
        render(<ProductLine quantity={quantity} product={product} handleRemoveItem={() => {}} />)
        expect(screen.getByText(`${product.price * quantity}`)).toBeInTheDocument();
    })
})