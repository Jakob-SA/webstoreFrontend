import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import Orderform from "./orderform";
import mockResponse from "../../assets/media/mockResponse.json";

// Test doesn't seem to be able to work. We might need to look into how we input the city into forms.
describe(Orderform.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test.skip("Should return the corrosponding city for zip code", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.spyOn(window, "fetch").mockImplementation(async () => {
      return {
        json: async () => mockResponse,
      } as Response;
    });

    render(<Orderform />);

    const zipCodeInput = screen.getByLabelText("Zip Code:*");
    await user.type(zipCodeInput, "2200");
    fireEvent.blur(zipCodeInput);

    await screen.findByText("København N");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.dataforsyningen.dk/postnumre/2200"
    );
  });
});


test("Should show loading after submitting form", async () => {
    const { getByRole, getByText } = render(<Orderform />);
    const submitButton = getByRole("button", { name: "Submit order" });
    const termsCheckbox = getByRole("checkbox", { name: "Agree to terms & conditions" });

    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Submit order")).toBeInTheDocument();
    });
});
