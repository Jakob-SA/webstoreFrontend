import { fireEvent, render, screen } from "@testing-library/react";
/* import { act } from "react-dom/test-utils */
import { afterEach, describe, expect, test, vi } from "vitest";
import { ProductLine } from "./productLine";
import { Product } from "../product";
import productArray from "../../../assets/media/products.json";
import { QuantityInput } from "./quantityInput";
import { RemoveButton } from "./removeButton";

describe(ProductLine.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should decrement quantity from 3 to 2", () => {
    const product: Product = productArray[0];
    const quantity = 3;
    const mockSetQuantity = vi.fn();
    render(
      <QuantityInput
        quantity={quantity}
        setQuantity={mockSetQuantity}
        product={product}
      />
    );
    const incrementQuantity = screen.getByRole("button", { name: "-" });
    fireEvent.click(incrementQuantity);
    expect(mockSetQuantity).toHaveBeenCalledWith(2);
  });
});

describe(RemoveButton.name, () => {
  test("Should change the basketicon on hover", () => {
    render(<RemoveButton onClick={() => {}} />);
    const button = screen.getByRole("button");
    const openTrashcanImage = screen.getByRole("img") as HTMLImageElement;
    fireEvent.mouseOver(button);
    expect(openTrashcanImage.src).toContain("openTrashcan.png");
  });
});

/* vi.useFakeTimers();
describe(ProductLine.name, () => {
  test.skip("Should use handleRemoveItem with correct product when remove button is clicked", () => {
    const handleRemoveItem = vi.fn();
    const updateTotalPrice = vi.fn();
    const product: Product = {
      id: 1,
      name: "TestProduct",
      price: 100,
      rebateQuantity: 2,
      rebatePercent: 50,
      currency: "USD",
      upsellProductId: 2,
      amountInStock: 10,
    };

    const { getByRole } = render(
      <ProductLine
      product={product}
      handleRemoveItem={handleRemoveItem}
      updateTotalPrice={updateTotalPrice}
      />
    );

    fireEvent.click(getByRole("button", { name: "Remove icon" }));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleRemoveItem).toHaveBeenCalledWith(product.id);
  });
}); */
