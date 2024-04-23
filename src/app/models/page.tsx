import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { PrismaClient } from "@prisma/client";
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

type Props = {};

const Models = async (props: Props) => {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();

  const models: unknown = await prisma.models.findMany({
    where: {
      userId: {
        equals: session?.user.id,
      },
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-screen-lg flex-col">
      <div className="pb-10"><EditBar></EditBar></div>
        <div className="mb-4 flex w-full justify-between">
          <Button>Placeholder</Button>
          <Button>Create +</Button>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {models.map((model) => (
            <Card key={model["id"]} className="w-[325px]">
              <CardHeader>
                <CardTitle>{model["name"]}</CardTitle>
                <CardDescription>Test Description.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription className="text-xs">Updated: {model["updatedAt"].toLocaleDateString() + ' ' + model["updatedAt"].toLocaleTimeString() }</CardDescription>
                <Button asChild>
                  <Link href={"/models/editor/" + model["id"]}>Open</Link>
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
