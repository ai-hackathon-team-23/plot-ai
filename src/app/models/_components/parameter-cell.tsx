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

export function ParameterCell({ id, section, value, label, input, operator, visible }: Param) {

    return (
        <>
          <div className="flex-1 pr-2">{label}</div>
          {input !== 0 && ( 
             <div className="flex-1 p-2 text-right">
              {input}
            </div>
          )}
        </>
    )
}