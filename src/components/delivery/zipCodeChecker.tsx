import { useState } from "react";

interface ZipCodeCheckerProps {
  zipCode: string;
  onZipChange: (zipCode: string) => void;
  city: string;
  onCityChange: (city: string) => void;
}

export const ZipCodeChecker: React.FC<ZipCodeCheckerProps> = ({
  zipCode,
  onZipChange,
  city,
  onCityChange,
}) => {
  const [validZip, setValidZip] = useState(true);
  const [zipTouched, setZipTouched] = useState(false);

  // submits the postal code to the custom hook below and then opens async function to fetch the data from the api
  const handleZipCode = async (zipCode: string) => {
    try {
      const response = await fetch(
        "https://api.dataforsyningen.dk/postnumre/" + zipCode
      );
      const data = await response.json();

      // if the postal code is valid, set the city name and set the validZip state to true
      if (data.nr === zipCode) {
        onCityChange(data.navn);
        // setValidZip(true);
      } else {
        setValidZip(false);
      }
    } catch (error) {
      console.error("Error validating postal code", error);
      setValidZip(false);
    }
  };

  return (
    <div className="duoBox">
      <label htmlFor="zip" hidden>
        Zip Code:<span className="required">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter your zip code *"
        required
        id="zip"
        name="user_zip"
        value={zipCode}
        onChange={(e) => onZipChange(e.target.value)}
        onBlur={(e) => {
          setZipTouched(true);
          handleZipCode(e.target.value);
        }}
      />
      {zipTouched && !validZip && (
        <p className="zip-error-message">Invalid zip</p>
      )}
      <label htmlFor="city" hidden>
        City:<span className="required">*</span>
      </label>
      <input
        placeholder="City"
        type="text"
        required
        id="city"
        name="user_city"
        value={city}
      />
    </div>
  );
};
