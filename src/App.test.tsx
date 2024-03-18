import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe(App.name, () => {
  test("should render", () => {
    render(<App />);
    expect(screen.getByText("Basket")).toBeInTheDocument;
  });
});
