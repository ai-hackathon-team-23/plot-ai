import React from "react";

interface Param {
  id: string;
  section: string;
  value: string;
  label: string;
  format: string;
  input: number;
  operator: string;
  visible: boolean;
}

export function ParameterCell({ id, section, value, label, format, input, operator, visible }: Param) {

    return (
        <>
          <div className="flex-1 px-2">{label}</div>
          {input !== 0 && ( 
             <div className="flex-1 px-2 text-right">
              {format === "USD" ? `$${input}` : format === "percent" ? `${input}%` : input}
            </div>
          )}
        </>
    )
}