import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import './components/utils/matchMedia';

describe(App.name, () => {
  test("should render", () => {
    render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
    expect(screen.getByText("Basket")).toBeInTheDocument;
  });
});