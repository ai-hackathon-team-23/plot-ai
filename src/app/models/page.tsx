import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { PrismaClient } from "@prisma/client";
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
import CreateModelForm from "./_components/create-model-form";

const Models = async () => {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();

  const models = await prisma.models.findMany({
    where: {
      userId: {
        equals: session?.user.id,
      },
    },
  });

  return (
    <div className="flex flex-col mx-48 mt-8">
        <h2 className="mb-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Models
        </h2>
        <div className="flex w-full flex-col">
          <div className="mb-4 flex w-full justify-between">
            <Button>Placeholder</Button>
            <CreateModelForm />
          </div>
          <div className="grid grid-cols-3 ">
            {models.map((model) => (
              <Card key={model.id} className="w-[325px]">
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>Test Description.</CardDescription>
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
                    <Link href={"/models/editor/" + model.id}>Open</Link>
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
