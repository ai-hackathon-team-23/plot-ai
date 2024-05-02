import React from "react";

import {
  PlusIcon,
  Cross2Icon,
  SlashIcon,
  MinusIcon,
} from "@radix-ui/react-icons";

interface Param extends React.ComponentProps<"div"> {
  id: string;
  section: string;
  value: string;
  label: string;
  format: string;
  input: number;
  operator: string;
  visible: boolean;
}

export function ParameterCell({
  id,
  section,
  value,
  label,
  format,
  input,
  operator,
  visible,
  ...props
}: Param) {
  return (
    <div {...props} className="flex flex-row justify-stretch">
      <div className="mx-1">
        {operator == "addition" ? (
          <PlusIcon />
        ) : operator == "subtraction" ? (
          <MinusIcon />
        ) : operator == "multiplication" ? (
          <Cross2Icon />
        ) : operator == "division" ? (
          <SlashIcon />
        ) : (
          ""
        )}
      </div>
      <div className="m-1">{label}</div>
      {input !== 0 && (
        <div className="flex-1 mx-1 text-end grow">
          {format === "USD"
            ? `$${input}`
            : format === "percent"
              ? `${input}%`
              : input}
        </div>
      )}
    </div>
  );
}
