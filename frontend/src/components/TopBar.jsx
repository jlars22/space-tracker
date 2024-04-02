import ButtonWithLink from "./ButtonWithLink";
import { Typography } from "@material-tailwind/react";

const TopBar = ({ links }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 p-2">
      <div className="ml-3 flex items-center">
        <img src="/ISS_emblem.png" alt="ISS Logo" style={{ width: "50px" }} />
        <Typography color="white" variant="h3" className="ml-2">
          International Space Station
        </Typography>
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
