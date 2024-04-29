"use client";
import React from "react";
import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";
import { propertyData } from "../_constants/property-response";
import Marker from "./marker";

interface GoogleMapsProviderProps extends React.ComponentProps<typeof Map> {
  children?: JSX.Element;
}

const GoogleMapsProvider = ({ children }: GoogleMapsProviderProps) => {
  const { data } = propertyData;

  return (
    <APIProvider apiKey={"AIzaSyCWsv5j7wTkXTWB6kvnd3V-kMd6yEovCqU"}>
      {children}
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: data[0].latitude, lng: data[0]?.longitude }}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"7c0199ec08d0006d"}
      >
          {data.map((propDetail) => {
            console.log({
              lat: propDetail.latitude!,
              lng: propDetail.longitude!,
            });
            const { latitude, longitude } = propDetail;

            if (!latitude && !longitude) return;
            return (
              <Marker
                key={propDetail.apn}
                apn={propDetail.apn}
                latitude={latitude}
                longitude={longitude}
                propDetail={propDetail}
              />
            );
          })}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapsProvider;
