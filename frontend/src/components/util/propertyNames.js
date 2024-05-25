import { IoMdGlobe, IoMdSpeedometer } from "react-icons/io";
import {
  TbClock,
  TbEye,
  TbMountain,
  TbWorldLatitude,
  TbWorldLongitude,
} from "react-icons/tb";

export const propertyNames = {
  latitude: { name: "Latitude", icon: <TbWorldLatitude /> },
  longitude: { name: "Longitude", icon: <TbWorldLongitude /> },
  altitude: { name: "Altitude (km)", icon: <TbMountain /> },
  velocity: { name: "Velocity (km/h)", icon: <IoMdSpeedometer /> },
  visibility: { name: "Visibility", icon: <TbEye /> },
  country: { name: "Country", icon: <IoMdGlobe /> },
  timezone: { name: "Timezone", icon: <TbClock /> },
};
