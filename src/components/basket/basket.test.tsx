import { afterEach, describe } from "node:test";
import Basket from "./basket";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import productArray from "../../assets/media/products.json";
import '../utils/matchMedia';

describe(Basket.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should give 10% on orders above 300", async () => {
    const basketItems = productArray; //not robust if change in basketItems
    const expectedPrice =
      basketItems.reduce((total, item) => total + item.price, 0) * 0.9;

    render(<Basket />);

    const totalPriceElement = await screen.findByText(
      "Total price: " + expectedPrice.toFixed(2)
    );
    expect(totalPriceElement).toBeInTheDocument();
  });
});
