import React, { useState } from "react";
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
import { ModelSearchBar, ExampleSearchBar } from "./_components/model-search-bar";
import GoogleMapsProvider from "./_components/google-maps-provider";
import { Props } from "next/script";
import { SearchPage } from "./_components/search-page";

const Search = async (props: Props) => {
  const session = await getServerAuthSession();
  const models = await api.models.getAll({ user_id: session?.user.id ?? "" });

  return (
    <SearchPage/>
  );
};

export default Search;
