"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

interface SearchResult {
  // Define your search result interface here based on your API response
  // For demonstration purposes, let's assume it's just a string
  result: string;
}

const GptSearchPage: React.FC = ({ keys }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const options = {
    method: "POST",
    mode: "no-cors",
    headers: {
      accept: "text/plain",
      "x-api-key": keys[0],
      "x-openai-key": keys[1],
      "x-user-id": "UniqueUserIdentifier",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      size: 25,
      query: query,
    }),
  };

  // Fetching Data Here
  const handleSubmit = async () => {
    fetch("https://api.realestateapi.com/v2/PropGPT", options)
      .then((response) => response.json())
      .then((response) => {
        /* Do something with the response */
        findPropertyMatches(response, nodeData);
      })
      .catch((err) => console.error(err));
  };

  // This function will find matching parameters in both json objects and populate the matches
  // list with the key and the value (response: ApiResponse, nodeData: The model's node data returned by our database)
  function findPropertyMatches(response, nodeData) {
    // Extract key names and values from the first JSON object
    const keyValues = response.data[0];

    // Initialize an array to store matches with values
    const matches = [];

    // Iterate over the 'data' array in the second JSON object
    nodeData.nodes.forEach((node) => {
      node.data.forEach((dataItem) => {
        // Check if the 'value' key exists
        if (dataItem.hasOwnProperty("value")) {
          // Check if the value matches any key names from the first JSON object
          const keyName = dataItem.value;
          if (keyValues.hasOwnProperty(keyName)) {
            matches.push({ key: keyName, value: keyValues[keyName] });
          }
        }
      });
    });
  }

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
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
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
