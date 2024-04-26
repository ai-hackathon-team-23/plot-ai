import React from "react";

interface Param extends React.ComponentProps<"div"> {
  id: string;
  sectionHeader: boolean;
  section: string;
  value: string;
  label: string;
  format: string;
  functionality?: () => void;
}

export function ParameterCell({ id, sectionHeader, section, value, label, format, functionality, ...props }: Param) {

    return (
     <div {...props}>
        {label}
    </div>
    );
  }