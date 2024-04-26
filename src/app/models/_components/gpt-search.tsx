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

  const handleSubmit = async () => {
    fetch("https://api.realestateapi.com/v2/PropGPT", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">Use AI to find properties:</h1>
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
        <Button type="submit">
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
