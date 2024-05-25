import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function TypographyWithLink({ link }) {
  return (
    <Link to={link.path} className="mr-2 hover:text-blue-600">
      <Typography
        variant="lead"
        className="flex w-20 items-center 
                       justify-center duration-300 ease-in-out"
      >
        {link.label}
      </Typography>
    </Link>
  );
}
