// @ts-nocheck
"use client"
import React, { useState } from "react";
import GptSearchPage from "~/app/models/_components/gpt-search";
import PropertyCard from "~/app/models/_components/property-card";



function Page() {
  const [propertyData, setPropertyData] = useState([]);

  function onResultUpdate(data) {
    // The data returned will be an array of key value pairs ex: ["assessedValue": "10000"]
    /* We could possibly format the returned data to be: 
    
    ["address": "example address",
     "price": "10000000",
     "propDetails": {[]}] 

     Then use a map to unravel the data to the PropertyCard component and populate it with whatever params we need
    
    */
    setPropertyData(data);
  };

  return (
    <div>
      {propertyData.map((property, index) => (
        <PropertyCard
          key={index}
          address={property.address}
          propDetails={property.propDetails}
          price={property.price}
          imageUrl={property.imageUrl}
        />
      ))}
      <GptSearchPage onResults={onResultUpdate}></GptSearchPage>
    </div>
  );
}

export default Page;
