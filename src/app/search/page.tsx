import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { PrismaClient } from "@prisma/client";
import { db } from "~/server/db";
import { api } from "~/trpc/server";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModelSearchBar } from "./_components/model-search-bar";
type Props = {};

const Search = async (props: Props) => {
  const session = await getServerAuthSession();
  const models = await api.models.getAll({ user_id: session?.user.id ?? "" });
  return (
    <div className="mx-48 mt-8 flex flex-col">
      <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Start your journey...
      </h2>
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full justify-between">
          <ModelSearchBar models={models}/>
        </div>
      </div>
    </div>
  );
};

export default Search;
