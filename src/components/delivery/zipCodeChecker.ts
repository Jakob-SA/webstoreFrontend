interface ZipCodeCheckerProps {
  zipCode: string;
}

export const ZipCodeChecker = async ({ zipCode }: ZipCodeCheckerProps) => {
  try {
    const response = await fetch(
      "https://api.dataforsyningen.dk/postnumre/" + zipCode
    );
    const data = await response.json();

    // if the postal code is valid, return the city name
    if (data.nr === zipCode) {
      return data.navn;
    } else {
      throw new Error("Invalid postal code");
    }
  } catch (error) {
    console.error("Error validating postal code", error);
    throw error;
  }
};
