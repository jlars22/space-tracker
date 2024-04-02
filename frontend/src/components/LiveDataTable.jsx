import React from "react";

const propertyNames = {
  latitude: "Latitude",
  longitude: "Longitude",
  altitude: "Altitude (km)",
  velocity: "Velocity (km/h)",
  visibility: "Visibility",
  country: "Country",
  timezone: "Timezone",
  timestamp: "Timestamp",
};

export default function LiveDataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-600 text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2">Property</th>
            <th className="border border-gray-600 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.entries(data)
              .filter(([key]) => key !== "timestamp")
              .map(([key, value]) => (
                <tr key={key} className="border border-gray-600">
                  <td className="border border-gray-600 px-4 py-2">
                    {propertyNames[key]}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {typeof value === "number" ? value.toFixed(2) : value}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
