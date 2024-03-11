import "./orderform.css";
import { useState } from "react";
import ZipCodeChecker from "./zipCodeChecker";

// This component is a form for the user to fill in their shipping information. It uses the ZipCodeChecker hook to validate the postal code and fill in the city name.
// Throughout the development of this form LLM has been used to debugging, sparring and pair programming. However no code has been copied from LLMs
// GitHub copilot has been used to generate some of the comments.

function Orderform() {
  const [zipCode, setZipCode] = useState("");

  const [deliveryZip, setDeliveryZip] = useState("");

  const [isBusiness, setIsBusiness] = useState(false);
  // This function is used to toggle the business name and VAT number fields
  const handleBusinessChange = () => {
    setIsBusiness(!isBusiness);
  };

  const [isDiliveryAdress, setIsDiliveryAdress] = useState(false);
  // This function is used to toggle the delivery adress fields
  const handleDeliveryAdressChange = () => {
    setIsDiliveryAdress(!isDiliveryAdress);
  };

  // This function is used to submit the postal code to the custom hook below
  const handleZipCodeSubmit = (zipCode: string, id: string) => {
    handleZipCode(zipCode, id);
  };

  // This is a custom hook that checks if the postal code is valid and fills in the city name
  const { validZip, validDeliveryZip, handleZipCode } = ZipCodeChecker(); // @Joes use isValid to show error message if postal code is invalid

  const [zipTouched, setZipTouched] = useState(false);
  const [deliveryZipTouched, setDeliveryZipTouched] = useState(false);

  return (
    <form action="/shipping-information" method="post">
      <h1>Checkout</h1>

      <h2>Shipping</h2>
      <legend>Enter your shipping details</legend>
      <ul>
        <section>
          <div>
            <div>
              {" "}
              {/* -- This is a checkbox to toggle the business name and VAT number fields */}
              <div>
                {" "}
                <div className="business-checkbox">
                  <label htmlFor="businessOrder">Business order:</label>
                  <input
                    type="checkbox"
                    id="businessOrder"
                    name="user_businessOrder"
                    checked={isBusiness}
                    onChange={handleBusinessChange}
                  />
                </div>
                {isBusiness && (
                  <div>
                    <div className="input-group">
                      <label htmlFor="businessName">Business Name:</label>
                      <input
                        type="text"
                        required
                        id="businessName"
                        name="user_businessName"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="VAT">Vat Number:</label>
                      <input
                        type="text"
                        required
                        id="VAT"
                        name="user_VAT"
                        pattern="^\d{8}$" // This is a pattern to validate the VAT number to the danish format
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                required
                id="first-name"
                name="user_first_name"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" required id="last-name" name="user_last_name" />
          </div>
          <div className="input-group">
            <label htmlFor="Country">Country:</label>
            <input
              type="text"
              required
              id="country"
              name="user_country"
              value={"Denmark"}
              readOnly
            />
          </div>
          <div className="input-group">
            <label htmlFor="adress1">Adress:</label>
            <input type="text" required id="adress1" name="user_adress1" />
          </div>
          <div className="input-group">
            <label htmlFor="adress2">Appartment, suite etc.:</label>
            <input type="text" id="adress2" name="user_adress2" />
          </div>
          <div className="input-group">
            <label htmlFor="zip">Zip Code:</label>
            <input
              type="text"
              required
              id="zip"
              name="user_zip"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onBlur={(e) => {
                setZipTouched(true);
                handleZipCodeSubmit(e.target.value, e.target.id);
              }}
            />
            {zipTouched && !validZip && (
              <p className="zip-error-message">Postal code is invalid</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="city">City:</label>
            <input type="text" required id="city" name="user_city" />
          </div>
          <div>
            {" "}
            {/* -- This is a checkbox to toggle the delivery adress fields */}
            <div className="address-checkbox">
              <label htmlFor="deliveryAdress">Different delivery adress:</label>
              <input
                type="checkbox"
                id="deliveryAdress"
                name="user_deliveryAdress"
                checked={isDiliveryAdress}
                onChange={handleDeliveryAdressChange}
              />
            </div>
            {isDiliveryAdress && (
              <div>
                <div className="input-group">
                  <label htmlFor="deliveryCountry">Country:</label>
                  <input
                    type="text"
                    required
                    id="deliveryCountry"
                    name="user_deliveryCountry"
                    value={"Denmark"}
                    readOnly
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="deliveryAdress1">Adress:</label>
                  <input
                    type="text"
                    required
                    id="deliveryAdress1"
                    name="user_deliveryAdress1"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="deliveryAdress2">
                    Appartment, suite etc.:
                  </label>
                  <input
                    type="text"
                    id="deliveryAdress2"
                    name="user_deliveryAdress2"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="deliveryZip">Zip Code:</label>
                  <input
                    type="text"
                    required
                    id="deliveryZip"
                    name="user_deliveryZip"
                    value={deliveryZip}
                    onChange={(e) => setDeliveryZip(e.target.value)}
                    onBlur={(e) => {
                      setDeliveryZipTouched(true);
                      handleZipCodeSubmit(e.target.value, e.target.id);
                    }}
                  />
                  {deliveryZipTouched && !validDeliveryZip && (
                    <p className="zip-error-message">Postal code is invalid</p>
                  )}
                </div>
                <div className="input-group">
                  <label htmlFor="deliveryCity">City:</label>
                  <input
                    type="text"
                    required
                    id="deliveryCity"
                    name="user_deliveryCity"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" required id="email" name="user_email" />
          </div>
          <div className="input-group">
            <label htmlFor="telephoneNumber">Phonenumber:</label>
            <input
              type="tel"
              required
              pattern="^(\+45|0045)?\s?(\d{2}\s?){3}\d{2}$" // This is a pattern to validate the phone number to the danish format
              name="user_telephoneNumber"
              id="telephoneNumber"
            ></input>
          </div>
        </section>
        <section>
          <div className="submit-button">
            <input type="submit" value="Place order" />
          </div>
        </section>
      </ul>
    </form>
  );
}

export default Orderform;
