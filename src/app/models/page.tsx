import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditBar } from "./_components/edit-bar-container";
import CreateModelForm from "./_components/create-model-form";
import { SearchBar } from "./_components/search-bar";
import { ModelSearchBar } from "../search/_components/model-search-bar";
type Props = {};

const Models = async () => {
  const session = await getServerAuthSession();
  const models = await api.models.getAll({ user_id: session?.user.id ?? "" });
  return (
    <div className="mx-48 mt-8 flex flex-col">
      <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Models
      </h2>
      <div className="flex w-full flex-col">
        <div className="mb-4 flex w-full justify-between">
          <SearchBar placeholder={"Search..."} />
          <CreateModelForm userId={session?.user.id} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-10 2xl:grid-cols-4 ">
          {models.map((model) => (
            <Card key={model.id} className="w-full ">
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>{model.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription className="text-xs">
                  Updated:{" "}
                  {model.updatedAt.toLocaleDateString() +
                    " " +
                    model.updatedAt.toLocaleTimeString()}
                </CardDescription>
                <Button asChild>
                  <Link href={"/models/editor/" + model.id}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
