import { Spinner, Typography } from "@material-tailwind/react";
import { fetchHealth } from "api/health";
import { useEffect, useState } from "react";
import TypographyWithLink from "./TypographyWithLink";

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
    <div className="flex items-center justify-between p-2">
      <div className="ml-3 flex items-center">
        <Typography variant="h3" className="ml-2">
          International Space Station
        </Typography>
        {status !== "OK" && <Spinner color="blue" className="ml-2" />}
      </div>
      <div className="flex justify-center">
        {links.map((link, index) => (
          <TypographyWithLink key={index} link={link} />
        ))}
      </div>
    </div>
  );
};

export default TopBar;
