"use client";

import * as React from "react";
import { EDIT_OPTIONS, ITEMS_DATA_TEST } from "../_constants/constants";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownSelect } from "./dropdown-select";
import { useState } from "react";

export function EditBar() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="grid grid-cols-10 rounded-md outline outline-1">
        <div className="col-span-8">
          {/* {Block Title Here} */}
          <span className="inline-block pl-4 align-middle font-bold">
            Block Title
          </span>
        </div>
        <div className="col-span-2 flex justify-end">
          <span className="">
            <DropdownSelect
              size={"w-[200px]"}
              placeholder={"Edit"}
              items={EDIT_OPTIONS}
            />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10 rounded-md outline outline-1">
        <div className="col-span-2 border-r-2">
          {/* {Cell Title Here} */}
          <span className="inline-block pl-4 align-middle font-bold">
            Cell Title
          </span>
        </div>
        <div className="col-span-6">
          {/* {Cell Value Here} */}
          <span className="inline-block pl-4 align-middle">Cell Value</span>
        </div>
        <div className="justify-left col-span-2 flex">
          <span className="pl-1">
            <DropdownSelect
              size={"w-[160px]"}
              placeholder={"Format"}
              items={ITEMS_DATA_TEST}
            />
          </span>
          <span className="pl-3 pr-2 pt-2">
            <Checkbox
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
              className={'border border-dashed'}
            />
          </span>
        </div>
      </div>
    </>
  );
}
