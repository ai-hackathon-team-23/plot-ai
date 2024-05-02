"use client";
import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  propertyDataGlendora,
  propertyDataBuffalo,
  propertyDataLexington,
  propertyDataReno,
  propertyDataSeattle,
} from "../_constants/property-response";
import Marker from "./marker";

interface GoogleMapsProviderProps extends React.ComponentProps<typeof Map> {
  children?: JSX.Element;
}

const GoogleMapsProvider = ({
  children,
  exampleData,
}: GoogleMapsProviderProps) => {

  const [propertyData, setPropertyData] = useState(propertyDataGlendora);
  const [dataChange, setDataChange] = useState(false);
  const { data } = propertyData;

  useEffect(() => {
    switch (exampleData) {
      case "Buffalo, NY":
        setPropertyData(propertyDataBuffalo);
        setDataChange(true);
        break;
      case "Glendora, CA":
        setPropertyData(propertyDataGlendora);
        setDataChange(true);
        break;
      case "Lexington, KY":
        setPropertyData(propertyDataLexington);
        setDataChange(true);
        break;
      case "Reno, NV":
        setPropertyData(propertyDataReno);
        setDataChange(true);
        break;
      case "Seattle, WA":
        setPropertyData(propertyDataSeattle);
        setDataChange(true);
        break;
      default:
        setPropertyData(propertyDataBuffalo);
        break;
    }
  }, [exampleData]);

  useEffect(() => {
    if (dataChange) setDataChange(false);
  }, [dataChange]);

  return (
    <APIProvider apiKey={"AIzaSyCWsv5j7wTkXTWB6kvnd3V-kMd6yEovCqU"}>
      {children}
      <div className="flex flex-col items-center justify-center">
      {exampleData ? (
        <Map
          style={{ width: "70vw", height: "70vh" }}
          center={
            dataChange ? { lat: data[0].latitude, lng: data[0]?.longitude } : ""
          }
          defaultCenter={{ lat: data[0].latitude, lng: data[0]?.longitude }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"7c0199ec08d0006d"}
        >
          {data.map((propDetail) => {
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
      ) : (
        ""
      )}
      </div>
    </APIProvider>
  );
};

export default GoogleMapsProvider;
