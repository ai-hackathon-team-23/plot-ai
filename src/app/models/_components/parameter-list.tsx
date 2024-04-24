import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MyButton, ParameterCell } from "./parameter-cell";
import { PARAMETER_LIST_DATA } from "../_constants/constants";

type Props = {};

export function ParameterList() {
  return (
    <div className="bg-white-200 flex-none overflow-y-auto shadow-lg">
      {PARAMETER_LIST_DATA.map((section) => (
        <Collapsible defaultOpen={true} key={section.section}>
          <CollapsibleTrigger className="w-full rounded bg-gray-300 px-4 py-2 text-left font-bold">
            {section.section}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4">
            {section.parameters.map((param) => (
              <div key={param.value} className="w-full hover:bg-gray-100">
                <ParameterCell
                  value={param.value}
                  label={param.label}
                  format={param.format}
                />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
