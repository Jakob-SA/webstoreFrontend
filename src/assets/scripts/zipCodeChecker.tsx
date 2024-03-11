import { useState } from "react";

// This component is a form for the user to fill in their shipping information. It uses the ZipCodeChecker hook to validate the postal code and fill in the city name.
// Throughout the development of this form LLM has been used to debugging, sparring and pair programming. However no code has been copied from LLM's

function ZipCodeChecker() {
  const [isValid, setIsValid] = useState(false);

  // submits th postal code to the custom hook below and then opens async function to fetch the data from the api
  const handleZipCode = async (zipCode: string, id: string) => {
    try {
      const response = await fetch(
        "https://api.dataforsyningen.dk/postnumre/" + zipCode
      );
      const data = await response.json();

      // if the postal code is valid, set the city name and set the isValid state to true
      if (data.nr === zipCode) {
        setIsValid(true);
        const cityInput = document.getElementById("city") as HTMLInputElement;
        const deliveryCity = document.getElementById(
          "deliveryCity"
        ) as HTMLInputElement;

        // logic below checks what input field the postal code is for and sets the correct city name accordingly
        if (cityInput) {
          if (id === "zip") {
            cityInput.value = data.navn;
          }
          if (id === "deliveryZip") {
            deliveryCity.value = data.navn;
          }
        }
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error validating postal code", error);
      setIsValid(false);
    }
  };

  return { isValid, handleZipCode };
}

export default ZipCodeChecker;
