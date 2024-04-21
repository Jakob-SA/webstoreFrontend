import { fireEvent, render, screen } from "@testing-library/react";
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

describe(ProductLine.name, () => {
  test("Should remove the item", () => {
    let mockBasketItems = [
      { id: 1, name: "produc1", price: 100 },
      { id: 2, name: "produc2", price: 100 },
    ];
    const product: Product = productArray[0];
    const handleRemoveItem = (productId: number) => {
      mockBasketItems = mockBasketItems.filter((item) => item.id !== productId);
    };
    render(
      <ProductLine
        product={product}
        handleRemoveItem={() => handleRemoveItem(product.id)}
        updateTotalPrice={() => {}}
      />
    );
    const removeIcon = screen.getByAltText("Remove icon");
    const button = removeIcon.closest("button");
    if (button) fireEvent.click(button);
    expect(mockBasketItems.length).toBe(1);
  });
});
