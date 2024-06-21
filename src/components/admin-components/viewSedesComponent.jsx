"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { MapPin,Phone,Mail, BadgeInfo } from "lucide-react";
import { createSede } from "../../../actions/sedes";
import { toast } from "sonner";

const containerStyle = {
  width: "100%",
  height: "300px"
};


export default function ViewSedeComponent({sede}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const defaultCenter = {
    lat: sede.lat,
    lng: sede.lng,
  };
  
  const mapOptions = {
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: false,
  };
  


  return isLoaded ? (
    <div>

    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Sede {sede.name}</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="p-1 bg-sky-700 rounded-sm drop-shadow-md">
          <div style={containerStyle}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
              >
            {<Marker position={defaultCenter}/>}
              </GoogleMap>
            </div>
          </div>
            <div className="mt-4">
                <div className="flex items-center gap-2">
                <MapPin size={24} />
                <span>{sede.address}</span>
                </div>
                <div className="flex mt-2 items-center gap-2">
                <Phone size={24} />
                <span>{sede.phone}</span>
                </div>
                <div className="flex mt-2 items-center gap-2">
                <Mail size={24} />
                <span>{sede.email}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                <BadgeInfo size={24} />
                <span>{sede.description}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
