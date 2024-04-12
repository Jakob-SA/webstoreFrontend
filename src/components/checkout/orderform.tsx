import "./orderform.css";
import { FormEvent, useState } from "react";
import ZipCodeChecker from "./zipCodeChecker";
import NavigationBar from "../../NavigationBar";

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

  // This is a state that checks if the zip code input fields has been touched and is used to only show the error message if the input field has been touched
  const [zipTouched, setZipTouched] = useState(false);
  const [deliveryZipTouched, setDeliveryZipTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    var response;

    if (response === undefined) {
      setLoading(true);
    }

    const orderForm = e.currentTarget as HTMLFormElement;
    const orderformElements =
      orderForm.elements as typeof orderForm.elements & {
        firstName: HTMLInputElement;
        lastName: HTMLInputElement;
        country: HTMLInputElement;
        adress1: HTMLInputElement;
        adress2: HTMLInputElement;
        zip: HTMLInputElement;
        city: HTMLInputElement;
        deliveryCountry: HTMLInputElement;
        deliveryAdress1: HTMLInputElement;
        deliveryAdress2: HTMLInputElement;
        deliveryZip: HTMLInputElement;
        deliveryCity: HTMLInputElement;
        email: HTMLInputElement;
        telephoneNumber: HTMLInputElement;
        businessName: HTMLInputElement;
        VAT: HTMLInputElement;
      };
    if (isBusiness && isDiliveryAdress) {
      response = await fetch("https://eoi9wdj8cv1ukqb.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: orderformElements.firstName.value,
          lastName: orderformElements.lastName.value,
          country: orderformElements.country.value,
          adress1: orderformElements.adress1.value,
          adress2: orderformElements.adress2.value,
          zip: orderformElements.zip.value,
          city: orderformElements.city.value,
          deliveryCountry: orderformElements.deliveryCountry.value,
          deliveryAdress1: orderformElements.deliveryAdress1.value,
          deliveryAdress2: orderformElements.deliveryAdress2.value,
          deliveryZip: orderformElements.deliveryZip.value,
          deliveryCity: orderformElements.deliveryCity.value,
          email: orderformElements.email.value,
          telephoneNumber: orderformElements.telephoneNumber.value,
          businessName: orderformElements.businessName.value,
          VAT: orderformElements.VAT.value,
        }),
      });
    }
    if (isBusiness && !isDiliveryAdress) {
      response = await fetch("https://eoi9wdj8cv1ukqb.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: orderformElements.firstName.value,
          lastName: orderformElements.lastName.value,
          country: orderformElements.country.value,
          adress1: orderformElements.adress1.value,
          adress2: orderformElements.adress2.value,
          zip: orderformElements.zip.value,
          city: orderformElements.city.value,
          email: orderformElements.email.value,
          telephoneNumber: orderformElements.telephoneNumber.value,
          businessName: orderformElements.businessName.value,
          VAT: orderformElements.VAT.value,
        }),
      });
    }
    if (!isBusiness && isDiliveryAdress) {
      response = await fetch("https://eoi9wdj8cv1ukqb.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: orderformElements.firstName.value,
          lastName: orderformElements.lastName.value,
          country: orderformElements.country.value,
          adress1: orderformElements.adress1.value,
          adress2: orderformElements.adress2.value,
          zip: orderformElements.zip.value,
          city: orderformElements.city.value,
          deliveryCountry: orderformElements.deliveryCountry.value,
          deliveryAdress1: orderformElements.deliveryAdress1.value,
          deliveryAdress2: orderformElements.deliveryAdress2.value,
          deliveryZip: orderformElements.deliveryZip.value,
          deliveryCity: orderformElements.deliveryCity.value,
          email: orderformElements.email.value,
          telephoneNumber: orderformElements.telephoneNumber.value,
        }),
      });
    } else {
      response = await fetch("https://eoi9wdj8cv1ukqb.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: orderformElements.firstName.value,
          lastName: orderformElements.lastName.value,
          country: orderformElements.country.value,
          adress1: orderformElements.adress1.value,
          adress2: orderformElements.adress2.value,
          zip: orderformElements.zip.value,
          city: orderformElements.city.value,
          email: orderformElements.email.value,
          telephoneNumber: orderformElements.telephoneNumber.value,
        }),
      });
    }

    if (response.ok) {
      setLoading(false);
      alert("Order submitted, thank you for your purchase!");
    }
    if (!response.ok) {
      setLoading(false);
      alert("Order failed, please try again later");
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
                          title="Please enter a valid danish VAT number"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
            <div className="input-group">
              <label htmlFor="zip">
                Zip Code:<span className="required">*</span>
              </label>
              <input
                type="number"
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
              <label htmlFor="city">
                City:<span className="required">*</span>
              </label>
              <input type="text" required id="city" name="user_city" />
            </div>
            <div>
              {" "}
              {/* -- This is a checkbox to toggle the delivery adress fields */}
              <div className="address-checkbox">
                <label htmlFor="deliveryAdress">
                  Different delivery adress:
                </label>
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
                    <label htmlFor="deliveryZip">
                      Zip Code:<span className="required">*</span>
                    </label>
                    <input
                      type="number"
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
                      <p className="zip-error-message">
                        Postal code is invalid
                      </p>
                    )}
                  </div>
                  <div className="input-group">
                    <label htmlFor="deliveryCity">
                      City:<span className="required">*</span>
                    </label>
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
          </section>
          <section>
            {loading && <p>Loading...</p>}
            <div>
              <button onSubmit={handleSubmit}>Submit order</button>
            </div>
          </section>
        </ul>
      </form>
    </>
  );
}

export default Orderform;
