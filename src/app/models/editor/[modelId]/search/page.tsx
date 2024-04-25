import React from "react";
import GptSearchPage from "~/app/models/_components/gpt-search";
import { env } from "~/env";

const keys: string[] = [process.env.TEAM_API_KEY!, process.env.OPENAI_API_KEY!];

function page() {
  console.log(keys);
  return (
    <div>
      <GptSearchPage keys={keys}></GptSearchPage>
    </div>
  );
}

export default page;
