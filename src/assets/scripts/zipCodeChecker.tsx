import { useState } from "react";

// This component is a form for the user to fill in their shipping information. It uses the ZipCodeChecker hook to validate the postal code and fill in the city name.
// Throughout the development of this form LLM has been used to debugging, sparring and pair programming. However no code has been copied from LLM's

function ZipCodeChecker() {
  const [validZip, setValidZip] = useState(false);
  const [validDeliveryZip, setValidDeliveryZip] = useState(false);

  // submits the postal code to the custom hook below and then opens async function to fetch the data from the api
  const handleZipCode = async (zipCode: string, id: string) => {
    try {
      const response = await fetch(
        "https://api.dataforsyningen.dk/postnumre/" + zipCode
      );
      const data = await response.json();

      // if the postal code is valid, set the city name and set the validZip state to true
      if (data.nr === zipCode) {
        const cityInput = document.getElementById("city") as HTMLInputElement;
        const deliveryCity = document.getElementById(
          "deliveryCity"
        ) as HTMLInputElement;

        // logic below checks what input field the postal code is for and sets the correct city name accordingly
        if (cityInput) {
          if (id === "zip") {
            cityInput.value = data.navn;
            setValidZip(true);
          }
          if (id === "deliveryZip") {
            deliveryCity.value = data.navn;
            setValidDeliveryZip(true);
          }
        }
      } else {
        if (id === "zip") {
          setValidZip(false);
        }
        if (id === "deliveryZip") {
          setValidDeliveryZip(false);
        }
      }
    } catch (error) {
      console.error("Error validating postal code", error);
      setValidZip(false);
      setValidDeliveryZip(false);
    }
  };

  return { validZip, validDeliveryZip, handleZipCode };
}

export default ZipCodeChecker;
