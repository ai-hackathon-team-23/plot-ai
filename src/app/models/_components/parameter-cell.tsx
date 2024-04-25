import React from "react";

interface Param {
  id: string;
  sectionHeader: boolean;
  section: string;
  value: string;
  label: string;
  format: string;
  functionality?: () => void;
}

export function ParameterCell({ id, sectionHeader, section, value, label, format, functionality }: Param) {

    return (
     <div className="text-sm">
        {label}
    </div>
    );
  }