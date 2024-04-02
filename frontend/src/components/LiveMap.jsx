import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const issMarkerIcon = L.icon({
  iconUrl: "/ISS_icon.png",
  iconSize: [75, 75],
  iconAnchor: [38, 25],
});

export default function LiveMap({ data }) {
  return (
    <div className="h-96 w-1/3 border border-gray-600">
      <MapContainer
        center={[data?.latitude || 0, data?.longitude || 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_MAP_API_KEY}`}
        />
        {data && (
          <Marker
            position={[data.latitude, data.longitude]}
            icon={issMarkerIcon}
          >
            <Popup>
              Latitude: {data.latitude} <br />
              Longitude: {data.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
