"use client";

import * as React from "react";
import { EDIT_OPTIONS, OPERATIONS } from "../_constants/constants";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownSelect } from "./dropdown-select";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useModelNodesContext } from "~/app/_context/model-context";
import { createDynamicallyTrackedSearchParams } from "next/dist/client/components/search-params";

export function EditBar({}) {
  const {focus} = useModelNodesContext()

  const [blockTitle, setBlockTitle] = useState("");
  const [blockAction, setBlockAction] = useState("");
  const [cellValue, setCellValue] = useState("");
  const [cellOperator, setCellOperator] = useState("");
  const [cellVisible, setCellVisible] = useState(true);

  const handleBlockActionChange = (value: string) => {
    setBlockAction(value);
  };

  const handleCellValueChange = (value: string) => {
    setCellValue(value);
  };

  const handleOperatorChange = (value: string) => {
    setCellOperator(value);
  };

  const handleSetVisible = (cellVisible: boolean) => {
    setCellVisible(cellVisible);
  };

  useEffect(() => {
    console.log(focus);
    const id = focus.id

    // TO DO: 
    // Using the useEffect, everytime a new cell is clicked 
    // update the id and maintain the new values for 
    // cellValue, cellOperator, cellVisible if they were changed 
    // Using this we can resave the data using droppable-list-view.txt line 43

  }, [focus, cellValue, cellOperator, cellVisible]);

  return (
    <>
      <div className="width-4 grid grid-cols-10 items-center justify-center border">
        <div className="col-span-8">
          {/* {Block Title Here} */}
          <span className="inline-block pl-4 align-middle font-bold">
            {"Block Title"}
          </span>
        </div>
        <div className="col-span-2 flex justify-end">
          <span className="">
            <DropdownSelect
              size={"w-[200px]"}
              placeholder={"Edit"}
              items={EDIT_OPTIONS}
              className="rounded-none border-0 border-l shadow-none"
              onValueChange={handleBlockActionChange}
            />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10 items-center justify-center border-b border-l">
        <div className="col-span-2 border-r">
          <span className="inline-block pl-4 align-middle font-bold">
            {focus ? focus.label : "Cell Title"}
          </span>
        </div>
        <div className="col-span-6">
          <span className="block w-full pl-4">
            <Input
              type="number"
              placeholder="Cell Value"
              className="w-full border-0 focus-visible:ring-0"
              onChange={e => setCellValue(e.target.value)}
            />
          </span>
        </div>
        <div className="justify-left col-span-2 flex ">
          <span className="pl-1">
            <DropdownSelect
              size={"w-[165px]"}
              placeholder={"Operation"}
              items={OPERATIONS}
              className="rounded-none border-0 border-x shadow-none"
              onValueChange={handleOperatorChange}
            />
          </span>
          <span className="border-r pl-3 pr-2 pt-2">
            <Checkbox
              checked={cellVisible}
              onCheckedChange={handleSetVisible}
              className={"border border-dashed"}
            />
          </span>
        </div>
      </div>
    </>
  );
}
