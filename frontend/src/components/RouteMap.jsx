import {
  MapContainer,
  Polyline,
  TileLayer,
  useMap,
  Marker,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { MAP_API_KEY } from "config";

const issMarkerIcon = L.icon({
  iconUrl: "/ISS_icon.png",
  iconSize: [75, 75],
  iconAnchor: [38, 36],
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center);
  }, [center, map]);
}

export default function RouteMap({ route }) {
  const center = route.length > 0 ? route[route.length - 1] : [0, 0];

  return (
    <div className="h-96 w-8/12 shadow-md">
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={center} />
        <TileLayer
          url={`https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${MAP_API_KEY}`}
        />
        <Polyline positions={route} color="#FF5733" />
        {route.length > 0 && <Marker position={center} icon={issMarkerIcon} />}
      </MapContainer>
    </div>
  );
}
