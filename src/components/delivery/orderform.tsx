import "./orderform.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ZipCodeChecker } from "./zipCodeChecker";

// This component is a form for the user to fill in their shipping information. It uses the ZipCodeChecker hook to validate the postal code and fill in the city name.
// Throughout the development of this form LLM has been used to debugging, sparring and pair programming. However no code has been copied from LLMs
// GitHub copilot has been used to generate some of the comments.

function Orderform() {
  const [isBusiness, setIsBusiness] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [isDeliveryAddress, setIsDeliveryAddress] = useState(false);
  const navigate = useNavigate();

  // This function is used to toggle the business name and VAT number fields
  const handleBusinessChange = () => {
    setIsBusiness(!isBusiness);
  };

  // This function is used to toggle the delivery adress fields
  const handleDeliveryAdressChange = () => {
    setIsDeliveryAddress(!isDeliveryAddress);
  };

  const getFormData = (elements: any) => ({
    first_name: elements.firstName.value,
    last_name: elements.lastName.value,
    country: elements.country.value,
    address1: elements.address1.value,
    address2: elements.address2.value,
    zip_code: elements.zip.value,
    city: elements.city.value,
    email: elements.email.value,
    telephone_number: elements.telephoneNumber.value,
    order_comment: elements.orderComment.value,
    business_name: isBusiness ? elements.businessName.value : undefined,
    vat: isBusiness ? elements.VAT.value : undefined,
    delivery_country: isDeliveryAddress
      ? elements.deliveryCountry.value
      : undefined,
    delivery_address1: isDeliveryAddress
      ? elements.deliveryAdress1.value
      : undefined,
    delivery_address2: isDeliveryAddress
      ? elements.deliveryAdress2.value
      : undefined,
    delivery_zip: isDeliveryAddress ? elements.deliveryZip.value : undefined,
    delivery_city: isDeliveryAddress ? elements.deliveryCity.value : undefined,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = getFormData(form.elements);

    try {
      const response = await fetch(
        "https://dtu62597.eduhost.dk:10272/api/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Order submitted, thank you for your purchase!");
        navigate("/confirmation"); // Navigate on successful submit
      } else {
        alert("Order failed, please try again later");
      }
    } catch (error) {
      console.error("Failed to submit order", error);
      alert("Order failed, please try again later");
    } finally {
      setLoading(false);
    }
  }
  const FormHeader = () => {
    return (
      <>
        <h3>Please enter your delivery information</h3>
        <p>
          Fields marked with <span className="asterisk">*</span> are required
        </p>
        <div className="container">
          <div>
            <label htmlFor="businessOrder">Business order?</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="businessOrder"
              name="user_businessOrder"
              checked={isBusiness}
              onChange={handleBusinessChange}
            />
          </div>
        </div>
      </>
    );
  };

  const BusinessOrder = () => {
    return (
      <>
        {isBusiness && (
          <div className="duoBox">
            <div className="input-wrapper" data-required>
              <input
                type="text"
                required
                id="businessName"
                name="user_businessName"
              />
              <label htmlFor="businessName">Business Name</label>
            </div>
            <div className="input-wrapper" data-required>
              <input
                type="text"
                required
                id="VAT"
                name="user_VAT"
                pattern="^\d{8}$" // This is a pattern to validate the VAT number to the danish format
                title="Please enter a valid danish VAT number"
              />
              <label htmlFor="VAT">Vat Number</label>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormHeader />
        <BusinessOrder />
        <div className="duoBox">
          <div className="input-wrapper" data-required>
            <input
              type="text"
              required
              id="firstName"
              name="userFirstName"
              autoFocus
            />
            <label htmlFor="firstName">
              First Name<span className="required"></span>
            </label>
          </div>
          <div className="input-wrapper" data-required>
            <input type="text" required id="lastName" name="userLastName" />
            <label htmlFor="lastName" hidden>
              Last Name<span className="required"></span>
            </label>
          </div>
        </div>
        <div className="input-wrapper" data-required>
          <input
            type="email"
            required
            id="email"
            name="user_email"
            autoComplete="email"
          />
          <label htmlFor="email">
            Email<span className="required"></span>
          </label>
        </div>
        <div className="duoBox">
          <div className="input-wrapper" data-required>
            <input type="text" required id="address1" name="user_address1" />
            <label htmlFor="address1" hidden>
              Address<span className="required"></span>
            </label>
          </div>
          <div className="input-wrapper">
            <input type="text" id="address2" name="user_address2"/>
            <label htmlFor="address2">Appartment, suite etc.</label>
          </div>
        </div>
        <ZipCodeChecker
          zipCode={zipCode}
          zipId="zip"
          onZipChange={setZipCode}
          city={city}
          cityId="city"
          onCityChange={setCity}
        />
        <div className="duoBox">
          <div className="input-wrapper" data-required>
            <input
              type="tel"
              required
              pattern="^(\+45|0045)?\s?(\d{2}\s?){3}\d{2}$" // This is a pattern to validate the phone number to the danish format
              name="user_telephoneNumber"
              id="telephoneNumber"
              title="Please enter a valid danish phone number"
            ></input>
            <label htmlFor="telephoneNumber">
              Phone Number<span className="required"></span>
            </label>
          </div>
          <div className="input-wrapper" data-required>
            <input
              type="text"
              required
              id="country"
              name="userCountry"
              value={"Denmark"}
              readOnly
            />
            <label htmlFor="country">
              <span hidden>Country</span>
              <span className="required"></span>
            </label>
          </div>
        </div>
        <div className="container">
          <div>
            <label htmlFor="deliveryAdress">Different delivery address?</label>
          </div>
          <div>

            <input
              type="checkbox"
              id="deliveryAdress"
              name="user_deliveryAdress"
              checked={isDeliveryAddress}
              onChange={handleDeliveryAdressChange}
            />
          </div>
        </div>
        {isDeliveryAddress && (
          <div>
            <div className="input-wrapper" data-required>
              <input
                type="text"
                required
                id="deliveryCountry"
                name="user_deliveryCountry"
                value={"Denmark"}
                readOnly
              />
              <label htmlFor="deliveryCountry">
                <span hidden>Country</span>
                <span className="required"></span>
              </label>
            </div>
            <div className="duoBox">
              <div className="input-wrapper" data-required>
                <input
                  type="text"
                  required
                  id="deliveryAdress1"
                  name="user_deliveryAdress1"
                />
                <label htmlFor="deliveryAdress1">
                  Address<span className="required"></span>
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="deliveryAdress2"
                  name="user_deliveryAdress2"
                />
                <label htmlFor="deliveryAdress2">Appartment, suite etc.</label>
              </div>
            </div>
            <ZipCodeChecker
              zipCode={deliveryZipCode}
              zipId="deliveryZip"
              onZipChange={setDeliveryZipCode}
              city={deliveryCity}
              cityId="deliveryCity"
              onCityChange={setDeliveryCity}
            />
          </div>
        )}
        <label htmlFor="orderComment"></label>
        <textarea
          placeholder="Here you can leave a comment for your order"
          name="orderComment"
          id="orderComment"
          rows={2}
          cols={50}
        />
        <div className="container">
          <div>
            <label htmlFor="termsAndConditions">
              Agree to{" "}
              <a href="/terms-and-conditions" target="_blank">
                terms & conditions
              </a>
            </label>
          </div>
          <div>
            <input type="checkbox" id="termsAndConditions" required />
          </div>
        </div>
        {loading && <p>Loading...</p>}
        <button type="submit" className="acceptButton">
          Submit order
        </button>
      </form>
    </>
  );
}

export default Orderform;
