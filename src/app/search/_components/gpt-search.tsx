"use client"
// @ts-nocheck
import React, { useState } from "react";
import { useModelNodesContext } from "~/app/_context/model-context";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface GptSearchPageProps {
  onResults: (results: JSON) => JSON;
}

const GptSearchPage: React.FC<GptSearchPageProps> = ({ onResults }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const fetchProperties = api.propertySearch.search.useMutation();
  const nodes = {
    nodes: [
      {
        id: "0",
        type: "blockComp",
        data: [
          {
            id: "vy4wuo965iq",
            section: "Property Details",
            value: "deckArea",
            label: "Deck Area",
            format: "size",
            input: 0,
            operator: "",
            visible: true,
          },
          {
            id: "ej2pk6l6lsj",
            section: "Property Details",
            value: "deckArea",
            label: "Deck Area",
            format: "size",
            input: 0,
            operator: "",
            visible: true,
          },
          {
            id: "1yx5rx7c9wfh",
            section: "Property Details",
            value: "squareFeet",
            label: "Square Feet",
            format: "size",
            input: 0,
            operator: "",
            visible: true,
          },
          {
            id: "09ushjuob9px",
            section: "Property Details",
            value: "unitsCount",
            label: "Unit Count",
            format: "number",
            input: 0,
            operator: "",
            visible: true,
          },
        ],
        dragHandle: ".custom-drag-handle",
        style: {
          border: "2px solid #ddd",
          background: "white",
          borderRadius: "8px",
        },
        position: { x: 0, y: 0 },
        width: 276,
        height: 196,
      },
      {
        id: "1",
        type: "blockComp",
        dragHandle: ".custom-drag-handle",
        position: { x: 311.5153248642067, y: 108.71122718380283 },
        style: {
          border: "2px solid #ddd",
          background: "white",
          borderRadius: "8px",
        },
        data: [
          {
            id: "3n36fktrp4y",
            section: "Financial Valuation",
            value: "assessedLandValue",
            label: "Assessed Land Value",
            format: "USD",
            input: 0,
            operator: "",
            visible: true,
          },
          {
            id: "raeiz6vfwu",
            section: "Financial Valuation",
            value: "priorSaleAmount",
            label: "Prior Sale Amount",
            format: "USD",
            input: 0,
            operator: "",
            visible: true,
          },
          {
            id: "qoa6conq1o",
            section: "Financial Valuation",
            value: "assessedValue",
            label: "Assessed Value",
            format: "USD",
            input: 0,
            operator: "",
            visible: true,
          },
        ],
        width: 276,
        height: 196,
      },
    ],
    edges: [{ id: "1", source: "0", target: "1" }],
    viewport: {
      x: -251.76669469951742,
      y: -24.53523350178338,
      zoom: 1.3571296849803665,
    },
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const result = fetchProperties.mutate({
      nodes: JSON.stringify(nodes),
      userInput: query,
    });

    onResults(result);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Use AI to find properties:
      </h1>
      <form
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="w-full rounded-md border border-gray-300 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {searchResult && (
        <div className="mt-8">
          <h2 className="mb-2 text-xl font-bold">Search Result:</h2>
          <p className="text-gray-800">{searchResult.result}</p>
        </div>
      )}
    </div>
  );
};

export default GptSearchPage;

