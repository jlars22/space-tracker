import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  TbWorldLatitude,
  TbWorldLongitude,
  TbMountain,
  TbEye,
  TbClock,
} from "react-icons/tb";
import { IoMdSpeedometer, IoMdGlobe } from "react-icons/io";

const propertyNames = {
  latitude: { name: "Latitude", icon: <TbWorldLatitude /> },
  longitude: { name: "Longitude", icon: <TbWorldLongitude /> },
  altitude: { name: "Altitude (km)", icon: <TbMountain /> },
  velocity: { name: "Velocity (km/h)", icon: <IoMdSpeedometer /> },
  visibility: { name: "Visibility", icon: <TbEye /> },
  country: { name: "Country", icon: <IoMdGlobe /> },
  timezone: { name: "Timezone", icon: <TbClock /> },
};

const renderValue = (key, value) => {
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

export default function LiveDataTable({ data }) {
  return (
    <div>
      <table className="mt-2 text-white">
        <tbody>
          {data &&
            Object.entries(data)
              .filter(([key]) => key !== "timestamp" && key !== "astronauts")
              .map(([key, value]) => (
                <tr key={key} className="">
                  <td className="flex items-center px-4 py-2">
                    {propertyNames[key].icon}
                    <span className="ml-2">{propertyNames[key].name}</span>
                  </td>
                  <td className=" px-4 py-2">{renderValue(key, value)}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
