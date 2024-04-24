import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { PARAMETER_LIST_DATA } from "../_constants/constants";
import { ParameterCell } from "./parameter-cell";

export function ParameterListSearch() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a parameter to search..." />
      <CommandList className="max-h-[800px] ">
        <CommandEmpty>No results found.</CommandEmpty>
        {PARAMETER_LIST_DATA.map((section) => (
          <>
            <CommandGroup heading={section.section}>
              <CommandSeparator />
              {section.parameters.map((param) => (
                <div key={param.value} className="w-full hover:bg-gray-100">
                  <CommandItem>
                    <ParameterCell
                      value={param.value}
                      label={param.label}
                      format={param.format}
                    />
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        ))}
      </CommandList>
    </Command>
  );
}
