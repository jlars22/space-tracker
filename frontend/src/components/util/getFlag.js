import ReactCountryFlag from "react-country-flag";

export const renderValue = (key, value) => {
  if (key === "country") {
    if (value === "??") {
      return "Unknown";
    }
    return (
      <>
        <ReactCountryFlag
          countryCode={value}
          style={{ width: 25, height: 25 }}
          className="mr-1"
          svg
        />
        {value}
      </>
    );
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value;
  }
};
