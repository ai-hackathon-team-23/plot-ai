import React from "react";
import GptSearchPage from "~/app/models/_components/gpt-search";
import PropertyCard from "~/app/models/_components/property-card";
import { env } from "~/env";

const keys: string[] = [process.env.TEAM_API_KEY!, process.env.OPENAI_API_KEY!];

function page() {
  console.log(keys);
  return (
    <div>
      <PropertyCard address={"630 N. Trayer Ave Glendora, CA 91741"} params={["param", "param"]} price={"10000"} imageUrl={"https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}></PropertyCard>
      <GptSearchPage keys={keys}></GptSearchPage>
    </div>
  );
}

export default page;
