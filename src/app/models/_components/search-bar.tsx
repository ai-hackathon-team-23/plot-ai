"use client";

import * as React from "react";
import { Input } from "~/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchBar({ placeholder }) {
  return (
    <>
      <div className="">
        <form>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={placeholder} className="pl-8" />
          </div>
        </form>
      </div>
    </>
  );
}
