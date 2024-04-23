import "./orderform.css";
import { FormEvent, useState } from "react";

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
    address1: elements.adress1.value,
    address2: elements.adress2.value,
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
          Fields marked with <p className="asterisk">*</p> are required.
        </p>
        <label htmlFor="businessOrder">Business order:</label>
        <input
          type="checkbox"
          id="businessOrder"
          name="user_businessOrder"
          checked={isBusiness}
          onChange={handleBusinessChange}
        />
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormHeader />
        {isBusiness && (
          <div>
            <label htmlFor="businessName" hidden>
              Business Name:
            </label>
            <input
              placeholder="Enter your business name *"
              type="text"
              required
              id="businessName"
              name="user_businessName"
            />
            <label htmlFor="VAT" hidden>
              Vat Number:
            </label>
            <input
              placeholder="Enter your VAT number *"
              type="text"
              required
              id="VAT"
              name="user_VAT"
              pattern="^\d{8}$" // This is a pattern to validate the VAT number to the danish format
              title="Please enter a valid danish VAT number"
            />
          </div>
        )}
        <div className="duoBox">
          <label htmlFor="firstName" hidden>
            First Name:<span className="required">*</span>
          </label>
          <div className="input-wrapper" data-required>
            <input
              placeholder="Enter your first name *"
              type="text"
              required
              id="firstName"
              name="userFirstName"
              autoFocus
            />
          </div>
          <label htmlFor="lastName" hidden>
            Last Name:<span className="required">*</span>
          </label>
          <div className="input-wrapper" data-required>
            <input
              placeholder="Enter your last name *"
              type="text"
              required
              id="lastName"
              name="userLastName"
            />
          </div>
        </div>
        <label htmlFor="email" hidden>
          Email:<span className="required">*</span>
        </label>
        <div className="input-wrapper" data-required>
          <input
            placeholder="Enter your email *"
            type="email"
            required
            id="email"
            name="user_email"
            autoComplete="email"
          />
        </div>
        <div className="duoBox">
          <label htmlFor="address1" hidden>
            Adress:<span className="required">*</span>
          </label>
          <input
            placeholder="Enter your Address *"
            type="text"
            required
            id="address1"
            name="user_address1"
          />

          <label htmlFor="adress2" hidden>
            Appartment, suite etc.:
          </label>
          <input
            placeholder="Enter appartment, suite etc."
            type="text"
            id="adress2"
            name="user_adress2"
          />
        </div>

        <ZipCodeChecker
          zipCode={zipCode}
          onZipChange={setZipCode}
          city={city}
          onCityChange={setCity}
        />
        <div className="duoBox">
          <label htmlFor="telephoneNumber" hidden>
            Phonenumber:<span className="required">*</span>
          </label>
          <input
            placeholder="Enter your phone number *"
            type="tel"
            required
            pattern="^(\+45|0045)?\s?(\d{2}\s?){3}\d{2}$" // This is a pattern to validate the phone number to the danish format
            name="user_telephoneNumber"
            id="telephoneNumber"
            title="Please enter a valid danish phone number"
          ></input>
          <label htmlFor="country" hidden>
            Country: <span className="required">*</span>
          </label>
          <input
            type="text"
            required
            id="country"
            name="userCountry"
            value={"Denmark"}
            readOnly
          />
        </div>
        <label htmlFor="deliveryAdress">Different delivery adress:</label>
        <input
          type="checkbox"
          id="deliveryAdress"
          name="user_deliveryAdress"
          checked={isDeliveryAddress}
          onChange={handleDeliveryAdressChange}
        />
        {isDeliveryAddress && (
          <div>
            <label htmlFor="deliveryCountry" hidden>
              Country:<span className="required">*</span>
            </label>
            <input
              type="text"
              required
              id="deliveryCountry"
              name="user_deliveryCountry"
              value={"Denmark"}
              readOnly
            />
            <label htmlFor="deliveryAdress1" hidden>
              Adress:<span className="required">*</span>
            </label>
            <input
              placeholder="Enter your requested delivery Address *"
              type="text"
              required
              id="deliveryAdress1"
              name="user_deliveryAdress1"
            />
            <label htmlFor="deliveryAdress2" hidden>
              Appartment, suite etc.:
            </label>
            <input
              placeholder="Enter appartment, suite etc."
              type="text"
              id="deliveryAdress2"
              name="user_deliveryAdress2"
            />
            <ZipCodeChecker
              zipCode={deliveryZipCode}
              onZipChange={setDeliveryZipCode}
              city={deliveryCity}
              onCityChange={setDeliveryCity}
            />
          </div>
        )}

        <label htmlFor="orderComment"></label>
        <textarea
          placeholder="Here you can leave a comment for your order"
          name="orderComment"
          id="orderComment"
        />
        <label htmlFor="a">
          Agree to{" "}
          <a href="/terms-and-conditions" target="_blank">
            terms & conditions
          </a>
        </label>
        <input type="checkbox" id="termsAndConditions" required />
        {loading && <p>Loading...</p>}
        <button type="submit" className="acceptButton">
          Submit order
        </button>
      </form>
    </>
  );
}

export default Orderform;
