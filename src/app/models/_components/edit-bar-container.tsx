"use client";

import * as React from "react";
import { EDIT_OPTIONS, OPERATIONS } from "../_constants/constants";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownSelect } from "./dropdown-select";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { useModelNodesContext } from "~/app/_context/model-context";
import { createDynamicallyTrackedSearchParams } from "next/dist/client/components/search-params";
import { get } from "node:https";

export function EditBar({}) {
  const {focus, setUpdatedItem} = useModelNodesContext()

  const [cellValue, setCellValue] = useState("");
  const [cellOperator, setCellOperator] = useState("");
  const [cellVisible, setCellVisible] = useState(true);

  const handleOperatorChange = (value: string) => {
    setCellOperator(value);
  };

  const handleSetVisible = (cellVisible: boolean) => {
    setCellVisible(cellVisible);
  };

  useEffect(() => {
    if(focus) {
      setCellVisible(focus.visible);
      setCellValue(focus.input);
      setCellOperator(focus.operator);
    }

  }, [focus])


  useEffect(() => {
    if (focus) {
      const newItem = {
        id: focus.id,
        section: focus.section,
        value: focus.value,
        label: focus.label,
        format: focus.format,
        input:  cellValue,
        operator: cellOperator,
        visible: cellVisible,
      }
      setUpdatedItem(newItem);
    }

  }, [cellValue, cellOperator, cellVisible]);

  return (
    <>
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
              value={cellValue}
              onChange={e => setCellValue(e.target.value)}
            />
          </span>
        </div>
        <div className="justify-left col-span-2 flex ">
          <span className="pl-1">
            <DropdownSelect
              size={"w-[165px]"}
              placeholder="Operation"
              items={OPERATIONS}
              value={cellOperator}
              className="rounded-none border-0 border-x shadow-none" 
              onValueChange={setCellOperator}
            />
          </span>
          <span className="border-r pl-3 pr-2 pt-2">
            <Checkbox
              checked={cellVisible}
              value={cellVisible}
              onCheckedChange={handleSetVisible}
              className={"border border-dashed"}
            />
          </span>
        </div>
      </div>
    </>
  );
}
