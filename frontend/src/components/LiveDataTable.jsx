import { Typography } from "@material-tailwind/react";
import { renderValue } from "./util/getFlag";
import { propertyNames } from "./util/propertyNames";

export default function LiveDataTable({ data }) {
  return (
    <div className="rounded-md border-2 p-4 shadow-sm">
      <table className="divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {data &&
            Object.entries(data)
              .filter(([key]) => key !== "timestamp" && key !== "astronauts")
              .map(([key, value]) => (
                <tr key={key} className="">
                  <td className="flex items-center px-4 py-2">
                    {propertyNames[key].icon}
                    <Typography className="ml-2">
                      {propertyNames[key].name}
                    </Typography>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Typography>{renderValue(key, value)}</Typography>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
