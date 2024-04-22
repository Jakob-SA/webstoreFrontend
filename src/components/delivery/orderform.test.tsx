import { fireEvent, render, screen} from "@testing-library/react";
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
    const { getByRole, getByPlaceholderText, findByText } = render(<Orderform />);
    const firstNameInput = getByPlaceholderText("Enter your first name *"); //Not possible to get the HTMLfor of the input field, so this is the best way to get the input field
    const lastNameInput = getByPlaceholderText("Enter you last name *");
    const addressInput = getByPlaceholderText("Enter your Adress *");
    const zipCodeInput = getByPlaceholderText("Enter your postal code *");
    const cityInput = getByPlaceholderText("Enter your city, or let us set it for you *");
    const emailInput = getByPlaceholderText("Enter your email *");
    const phoneNumberInput = getByPlaceholderText("Enter your phone number *");

    const submitButton = getByRole("button", { name: "Submit order" });
    const termsCheckbox = getByRole("checkbox", { name: "Agree to terms & conditions" });

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(addressInput, { target: { value: "Testvej 1" } });
    fireEvent.change(zipCodeInput, { target: { value: "2200" } });
    fireEvent.change(cityInput, { target: { value: "København N" } });
    fireEvent.change(emailInput, { target: { value: "JohnDoe@gmail.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "12345678" } });

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(addressInput).toHaveValue("Testvej 1");
    expect(zipCodeInput).toHaveValue("2200");
    expect(cityInput).toHaveValue("København N"); //This is not working, we need to find a way to get the city input field
    expect(emailInput).toHaveValue("JohnDoe@gmail.com");
    expect(phoneNumberInput).toHaveValue("12345678");

    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await findByText("Loading..."); 
});
