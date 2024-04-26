"use client";

import * as React from "react";
import { EDIT_OPTIONS, OPERATIONS } from "../_constants/constants";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownSelect } from "./dropdown-select";
import { useState } from "react";
import { Input } from "~/components/ui/input";

interface EditBarProps {
  blockTitle: string;
  cellTitle: string;
  blockAction: string;
  setBlockAction: React.Dispatch<React.SetStateAction<string>>;
  cellValue: string;
  setCellValue: React.Dispatch<React.SetStateAction<string>>;
  cellOperator: string;
  setCellOperator: React.Dispatch<React.SetStateAction<string>>;
  cellVisible: boolean;
  setCellVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditBar({
  blockTitle,
  cellTitle,
  blockAction,
  setBlockAction,
  cellValue,
  setCellValue,
  cellOperator,
  setCellOperator,
  cellVisible,
  setCellVisible,
}: EditBarProps) {
  return (
    <>
      <div className="width-4 grid grid-cols-10 items-center justify-center border">
        <div className="col-span-8">
          {/* {Block Title Here} */}
          <span className="inline-block pl-4 align-middle font-bold">
            {blockTitle}
          </span>
        </div>
        <div className="col-span-2 flex justify-end">
          <span className="">
            <DropdownSelect
              size={"w-[200px]"}
              placeholder={"Edit"}
              items={EDIT_OPTIONS}
              className="rounded-none border-0 border-l shadow-none"
              onValueChange={setBlockAction}
            />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10 items-center justify-center border-b border-l">
        <div className="col-span-2 border-r">
          <span className="inline-block pl-4 align-middle font-bold">
            {cellTitle}
          </span>
        </div>
        <div className="col-span-6">
          <span className="block w-full pl-4">
            <Input
              type="number"
              placeholder="Cell Value"
              className="w-full border-0 focus-visible:ring-0"
              onChange={(e) => setCellValue(e.target.value)}
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
              onValueChange={setCellOperator}
            />
          </span>
          <span className="border-r pl-3 pr-2 pt-2">
            <Checkbox
              checked={cellVisible}
              onCheckedChange={() => setCellVisible(cellVisible)}
              className={"border border-dashed"}
            />
          </span>
        </div>
      </div>
    </>
  );
}
