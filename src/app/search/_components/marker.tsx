import React, { useState } from "react";
import { PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { propertyDataGlendora } from "../_constants/property-response";
import { millify } from "~/lib/property-calc";

import HousingCardHorizontal from "./housing-card";
type Props = {
  latitude: number;
  longitude: number;
  apn: string;
  propDetail: (typeof propertyDataGlendora)["data"][0];
};

const Marker = ({ latitude, longitude, apn, propDetail }: Props) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);

  const toggleInfoWindow = () =>
    setInfowindowShown((previousState) => !previousState);

  const closeInfoWindow = () => setInfowindowShown(false);
  return (
    <>
      {infowindowShown && (
        <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
          <HousingCardHorizontal
            address={propDetail.address.address!}
            addCost={0}
            price={propDetail.assessedValue}
            rentEst={propDetail.suggestedRent? propDetail.suggestedRent: 0}
            downPayment={100000}
            interestRate={5.4}
            bathrooms={propDetail.bathrooms!}
            bedrooms={propDetail.bedrooms!}
            lotAreaValue={propDetail.lotSquareFeet}
            key={propDetail.apn}
            livingArea={propDetail.squareFeet}
          />
        </InfoWindow>
      )}

      <AdvancedMarker
        position={{
          lat: latitude,
          lng: longitude,
        }}
        key={apn}
        ref={markerRef}
        onClick={toggleInfoWindow}
      >
        <Button>{millify(propDetail.assessedValue)}</Button>
      </AdvancedMarker>
    </>
  );
};

export default Marker;
