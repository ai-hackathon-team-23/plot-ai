import React from "react";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const Models = async (props: Props) => {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();

  // Select all models with userId
  // Format models into list of buttons

  const models: unknown = await prisma.models.findMany({
    where: {
      userId: {
        equals: session?.user.id,
      },
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg border-2 border-black p-4">
        <div className="flex flex-col items-center">
          {models.map((model) => (
            <div className="p-2">
              <Button asChild>
                <Link href={"/models/editor/" + model["id"]}>
                  {" "}
                  {model["name"]}{" "}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
