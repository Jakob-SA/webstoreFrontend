import { useState } from "react";

interface ZipCodeCheckerProps {
  zipCode: string;
  zipId: string;
  onZipChange: (zipCode: string) => void;
  city: string;
  cityId: string;
  onCityChange: (city: string) => void;
}

export const ZipCodeChecker: React.FC<ZipCodeCheckerProps> = ({
  zipCode,
  zipId,
  onZipChange,
  city,
  cityId,
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
      <div className="input-wrapper" data-required>
        <input
          type="text"
          required
          id={zipId}
          name="user_zip"
          value={zipCode}
          onChange={(e) => onZipChange(e.target.value)}
          onBlur={(e) => {
            setZipTouched(true);
            handleZipCode(e.target.value);
          }}
        />
      <label htmlFor={zipId}>
        Zip Code<span className="required"></span>
      </label>
      </div>
      {zipTouched && !validZip && (
        <p className="zip-error-message"></p>
      )}
      <div className="input-wrapper" data-required>
        <input
          type="text"
          required
          id={cityId}
          name="user_city"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
      <label htmlFor={cityId}>
        City<span className="required"></span>
      </label>
      </div>
    </div>
  );
};
