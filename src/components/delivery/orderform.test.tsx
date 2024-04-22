import { fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import Orderform from "./orderform";
import mockResponse from "../../assets/media/mockResponse.json";

describe(Orderform.name, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Should return the corrosponding city for zip code", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.spyOn(window, "fetch").mockImplementation(async () => {
      return {
        json: async () => mockResponse,
      } as Response;
    });

    const { getByPlaceholderText} = render(<Orderform />);

    const zipCodeInput = getByPlaceholderText("Enter your postal code *");
    const cityInput = getByPlaceholderText("Enter your city, or let us set it for you *");
    await user.type(zipCodeInput, "2200");
    fireEvent.blur(zipCodeInput);

    await waitFor(() => {
      expect(cityInput).toHaveValue("København N");
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.dataforsyningen.dk/postnumre/2200"
    );
  });
});


test("Should show loading after submitting form", async () => {
    const { getByRole, getByLabelText, findByText } = render(<Orderform />);
    const firstNameInput = getByLabelText("First Name:*");
    const lastNameInput = getByLabelText("Last Name:*");
    const addressInput = getByLabelText("Adress:*");
    const zipCodeInput = getByLabelText("Zip Code:*");
    const cityInput = getByLabelText("City:*");
    const emailInput = getByLabelText("Email:*");
    const phoneNumberInput = getByLabelText("Phonenumber:*");

    const submitButton = getByRole("button", { name: "Submit order" });
    const termsCheckbox = getByRole("checkbox", { name: "Agree to terms & conditions" });

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");

    fireEvent.change(addressInput, { target: { value: "Testvej 1" } });
    expect(addressInput).toHaveValue("Testvej 1");

    fireEvent.change(zipCodeInput, { target: { value: "2200" } });
    expect(zipCodeInput).toHaveValue("2200");

    fireEvent.blur(zipCodeInput);
    await waitFor(() => {
      expect(cityInput).toHaveValue("København N");
    });

    fireEvent.change(emailInput, { target: { value: "JohnDoe@gmail.com" } });
    expect(emailInput).toHaveValue("JohnDoe@gmail.com");
    
    fireEvent.change(phoneNumberInput, { target: { value: "12345678" } });
    expect(phoneNumberInput).toHaveValue("12345678");
    
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await findByText("Loading..."); 
});
