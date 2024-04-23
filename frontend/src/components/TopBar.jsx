import { useEffect, useState } from "react";
import ButtonWithLink from "./ButtonWithLink";
import { Typography, Spinner } from "@material-tailwind/react";
import { fetchHealth } from "api/health";
import { FaCheckCircle } from "react-icons/fa";

const TopBar = ({ links }) => {
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchHealth()
        .then((data) => setStatus(data.status))
        .catch((error) => {
          console.error("Error:", error);
          setStatus("connecting");
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-900 p-2">
      <div className="ml-3 flex items-center">
        <Typography color="white" variant="h3" className="ml-2">
          International Space Station
        </Typography>
        {status === "OK" ? (
          <FaCheckCircle className="ml-2 h-6 w-6 animate-pulse rounded-full text-green-600" />
        ) : (
          <Spinner color="red" className="ml-2" />
        )}
      </div>
      <div className="flex justify-center">
        {links.map((link, index) => (
          <ButtonWithLink key={index} link={link} />
        ))}
      </div>
    </div>
  );
};

export default TopBar;
