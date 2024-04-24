import React from "react";

interface Props {
    value: string;
    label: string;
    format: string;
  }

export function ParameterCell({ value, label, format }: Props) {

    return (
     <div className="text-sm">
        {label}
    </div>
    );
  }