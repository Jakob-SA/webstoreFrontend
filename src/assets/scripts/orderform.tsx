import "./orderform.css";
import { useState } from "react";

function ZipCodeChecker() {
  const [validationMessage, setValidationMessage] = useState("");

  const handleZipCode = async (zipCode: string, id: string) => {
    try {
      const response = await fetch(
        "https://api.dataforsyningen.dk/postnumre/" + zipCode
      );
      const data = await response.json();

      if (data.nr === zipCode) {
        setValidationMessage("");
        const cityInput = document.getElementById("city") as HTMLInputElement;
        const deliveryCity = document.getElementById(
          "deliveryCity"
        ) as HTMLInputElement;

        if (cityInput) {
          if (id === "zip") {
            cityInput.value = data.navn;
          }
          if (id === "deliveryZip") {
            deliveryCity.value = data.navn;
          }
        }
      } else {
        setValidationMessage("Postal code is invalid");
      }
    } catch (error) {
      console.error("Error validating postal code", error);
      setValidationMessage("Error validating postal code");
    }
  };

  return { validationMessage, handleZipCode };
}

function Orderform() {
  const [zipCode, setZipCode] = useState("");
  const [deliveryZip, setDeliveryZip] = useState("");
  const { validationMessage, handleZipCode } = ZipCodeChecker();

  const [isBusiness, setIsBusiness] = useState(false);
  const [isDiliveryAdress, setIsDiliveryAdress] = useState(false);

  const handleBusinessChange = () => {
    setIsBusiness(!isBusiness);
  };

  const handleDeliveryAdressChange = () => {
    setIsDiliveryAdress(!isDiliveryAdress);
  };

  const handleSubmit = (zipCode: string, id: string) => {
    handleZipCode(zipCode, id);
  };

  return (
    <form action="/shipping-information" method="post">
      <h1>Checkout</h1>

      <h2>Shipping</h2>
      <legend>Enter your shipping details</legend>
      <ul>
        <section>
          <div>
            <div>
              <div>
                <label htmlFor="businessOrder">Business order:</label>
                <input
                  type="checkbox"
                  id="businessOrder"
                  name="user_businessOrder"
                  checked={isBusiness}
                  onChange={handleBusinessChange}
                />
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
                        pattern="^\d{8}$"
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
              onBlur={(e) => handleSubmit(e.target.value, e.target.id)}
            />
            <div>{validationMessage}</div>
          </div>
          <div className="input-group">
            <label htmlFor="city">City:</label>
            <input type="text" required id="city" name="user_city" />
          </div>
          <div>
            <label htmlFor="deliveryAdress">Different delivery adress:</label>
            <input
              type="checkbox"
              id="deliveryAdress"
              name="user_deliveryAdress"
              checked={isDiliveryAdress}
              onChange={handleDeliveryAdressChange}
            />
            {isDiliveryAdress && (
              <div>
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
                    onBlur={(e) => handleSubmit(e.target.value, e.target.id)}
                  />
                  <div>{validationMessage}</div>
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
            <label htmlFor="tel">Phonenumber:</label>
            <input
              type="tel"
              required
              pattern="^(?:\+45|0045)?\s?\d{2}(?:\s?|\-?)\d{2}(?:\s?|\-?)\d{2}(?:\s?|\-?)\d{2}$"
              name="user_telephoneNumber"
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
