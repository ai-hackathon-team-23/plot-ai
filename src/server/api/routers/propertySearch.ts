import { z } from "zod";
import { env } from "~/env";

const keys: string[] = [process.env.TEAM_API_KEY!, process.env.OPENAI_API_KEY!];

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const propertySearchRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ nodes: z.string(), userInput: z.string() }))
    .mutation(async ({ input }) => {
      const nodeData = JSON.parse(input.nodes);
      console.log("DATA==========", input.userInput);
      const options: RequestInit = {
        method: "POST",
        headers: {
          accept: "text/plain",
          "x-api-key": keys[0],
          "x-openai-key": keys[1],
          "x-user-id": "UniqueUserIdentifier",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          size: 25,
          query: input.userInput,
        }),
      };

      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("accept", "text/plain");
      requestHeaders.set("x-api-key", keys[0]);
      requestHeaders.set("x-openai-key", keys[1]);
      requestHeaders.set("content-type", "application/json");

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
        console.log(matches);
        return matches;
      }

      const response = fetch("https://api.realestateapi.com/v2/PropGPT", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          size: 25,
          query: input.userInput,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          /* Do something with the response */
          console.log(response);
          return findPropertyMatches(response, nodeData);
        })
        .catch((err) => console.error(err));
    }),
});
