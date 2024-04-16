import "./orderform.css";
import { FormEvent, useState } from "react";
import NavigationBar from "../../NavigationBar";
import { ZipCodeChecker2 } from "./zipCodeChecker2";

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
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    country: elements.country.value,
    adress1: elements.adress1.value,
    adress2: elements.adress2.value,
    zip: elements.zip.value,
    city: elements.city.value,
    email: elements.email.value,
    telephoneNumber: elements.telephoneNumber.value,
    businessName: isBusiness ? elements.businessName.value : undefined,
    VAT: isBusiness ? elements.VAT.value : undefined,
    deliveryCountry: isDeliveryAddress
      ? elements.deliveryCountry.value
      : undefined,
    deliveryAdress1: isDeliveryAddress
      ? elements.deliveryAdress1.value
      : undefined,
    deliveryAdress2: isDeliveryAddress
      ? elements.deliveryAdress2.value
      : undefined,
    deliveryZip: isDeliveryAddress ? elements.deliveryZip.value : undefined,
    deliveryCity: isDeliveryAddress ? elements.deliveryCity.value : undefined,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = getFormData(form.elements);

    try {
      const response = await fetch("https://eoi9wdj8cv1ukqb.m.pipedream.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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

  return (
    <>
      <NavigationBar />
      <form onSubmit={handleSubmit}>
        <h1>Checkout</h1>
        <h2>Shipping</h2>
        <legend>Enter your shipping details</legend>
        <p className="required-note">
          Fields marked with<span className="required">*</span> are required.
        </p>
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
                title="Please enter a valid danish VAT number"
              />
            </div>
          </div>
        )}
        <div className="input-group">
          <label htmlFor="firstName">
            First Name:<span className="required">*</span>
          </label>
          <input
            type="text"
            required
            id="firstName"
            name="userFirstName"
            autoFocus
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">
            Last Name:<span className="required">*</span>
          </label>
          <input type="text" required id="lastName" name="userLastName" />
        </div>
        <div className="input-group">
          <label htmlFor="country">
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
        <div className="input-group">
          <label htmlFor="adress1">
            Adress:<span className="required">*</span>
          </label>
          <input type="text" required id="adress1" name="user_adress1" />
        </div>
        <div className="input-group">
          <label htmlFor="adress2">Appartment, suite etc.:</label>
          <input type="text" id="adress2" name="user_adress2" />
        </div>
        <ZipCodeChecker2
          zipCode={zipCode}
          onZipChange={setZipCode}
          city={city}
          onCityChange={setCity}
        />
        <div className="address-checkbox">
          <label htmlFor="deliveryAdress">Different delivery adress:</label>
          <input
            type="checkbox"
            id="deliveryAdress"
            name="user_deliveryAdress"
            checked={isDeliveryAddress}
            onChange={handleDeliveryAdressChange}
          />
        </div>
        {isDeliveryAddress && (
          <div>
            <div className="input-group">
              <label htmlFor="deliveryCountry">
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
            </div>
            <div className="input-group">
              <label htmlFor="deliveryAdress1">
                Adress:<span className="required">*</span>
              </label>
              <input
                type="text"
                required
                id="deliveryAdress1"
                name="user_deliveryAdress1"
              />
            </div>
            <div className="input-group">
              <label htmlFor="deliveryAdress2">Appartment, suite etc.:</label>
              <input
                type="text"
                id="deliveryAdress2"
                name="user_deliveryAdress2"
              />
            </div>
            <ZipCodeChecker2
              zipCode={deliveryZipCode}
              onZipChange={setDeliveryZipCode}
              city={deliveryCity}
              onCityChange={setDeliveryCity}
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">
            Email:<span className="required">*</span>
          </label>
          <input
            type="email"
            required
            id="email"
            name="user_email"
            autoComplete="email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="telephoneNumber">
            Phonenumber:<span className="required">*</span>
          </label>
          <input
            type="tel"
            required
            pattern="^(\+45|0045)?\s?(\d{2}\s?){3}\d{2}$" // This is a pattern to validate the phone number to the danish format
            name="user_telephoneNumber"
            id="telephoneNumber"
            title="Please enter a valid danish phone number"
          ></input>
        </div>
        {loading && <p>Loading...</p>}
        <div>
          <button type="submit">Submit order</button>
        </div>
      </form>
    </>
  );
}

export default Orderform;
