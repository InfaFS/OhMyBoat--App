"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const containerStyle = {
  width: "100%",
  height: "200px"
};

const defaultCenter = {
  lat: -34.9035437,
  lng: -57.9375734,
};

export default function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Asegúrate de que esta variable esté correctamente definida en tu .env.local
  });

  const [map, setMap] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setClickedPosition({ lat, lng });
  };

  return isLoaded ? (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <Card className="w-1/4 min-w-[300px]">
          <CardHeader>
            <CardTitle>Map 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={containerStyle}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={10}
                onClick={handleClick}
                onLoad={onLoad}
                onUnmount={onUnmount} 
              >
                {clickedPosition && <Marker position={clickedPosition} />}
              </GoogleMap>
            </div>
          </CardContent>
        </Card>

        <Card className="w-1/4 min-w-[300px]">
          <CardHeader>
            <CardTitle>Map 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={containerStyle}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={10}
                onClick={handleClick}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {clickedPosition && <Marker position={clickedPosition} />}
              </GoogleMap>
            </div>
          </CardContent>
        </Card>

        <Card className="w-1/4 min-w-[300px]">
          <CardHeader>
            <CardTitle>Map 3</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={containerStyle}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={10} 
                onClick={handleClick}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {clickedPosition && <Marker position={clickedPosition} />}
              </GoogleMap>
            </div>
          </CardContent>
        </Card>
      </div>

      {clickedPosition && (
        <div className="text-center mt-4">
          <p>Clicked Position:</p>
          <p>Latitude: {clickedPosition.lat}</p>
          <p>Longitude: {clickedPosition.lng}</p>
        </div>
      )}
    </>
  ) : <></>;
}
