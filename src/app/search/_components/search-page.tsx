"use client";
import React, { useState } from "react";
import GoogleMapsProvider from "./google-maps-provider";
import { ExampleSearchBar } from "./model-search-bar";

export function SearchPage() {
  const [exampleData, setExampleData] = useState("");

  function handleExampleData(data) {
    setExampleData(data);
  }
  return (
    <GoogleMapsProvider exampleData={exampleData}>
      <div className="mx-48 mt-8 flex flex-col">
        <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Start your journey...
        </h2>
        <div className="flex w-full flex-col">
          <div className="mb-4 flex w-full justify-between">
            <ExampleSearchBar sendDataToParent={handleExampleData} />
          </div>
        </div>
      </div>
    </GoogleMapsProvider>
  );
}
