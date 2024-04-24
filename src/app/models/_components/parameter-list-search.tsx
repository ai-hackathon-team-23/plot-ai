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
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

export function ParameterListSearch() {
  return (
    <Command className="rounded-none border shadow-md">
      <CommandInput placeholder="Type a parameter to search..." />
      <CommandList className="max-h-[840px] ">
        <CommandEmpty>No results found.</CommandEmpty>
        {PARAMETER_LIST_DATA.map((section) => (
          <>
            <CommandGroup heading={section.section}>
              <CommandSeparator />
              {section.parameters.map((param) => (
                <div key={param.value} className="w-64 hover:bg-gray-100">
                  <CommandItem>
                    <ParameterCell
                      value={param.value}
                      label={param.label}
                      format={param.format}
                    />
                    <CommandShortcut><DragHandleDots2Icon/></CommandShortcut>
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
