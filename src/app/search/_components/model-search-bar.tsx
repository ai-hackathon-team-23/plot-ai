"use client";

import * as React from "react";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PARAMETER_LIST_DATA } from "../../models/_constants/constants";

const parameters = [
  {
    value: "parameter1",
    label: "Parameter 1",
  },
  {
    value: "parameter2",
    label: "Parameter 2",
  },
  {
    value: "parameter3",
    label: "Parameter 3",
  },
  {
    value: "parameter4",
    label: "Parameter 4",
  },
  {
    value: "parameter5",
    label: "Parameter 5",
  },
];

export function ModelSearchBar({models}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [label, setLabel] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-white text-black hover:bg-gray-200"
        >
          {value ? label : "Select a model..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Select a model..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setLabel(model.name);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === model.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {model.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// {models.map((model) => (
//   <CommandItem
//     key={model.id}
//     value={model.name}
//     onSelect={(currentValue) => {
//       setValue(currentValue === value ? "" : currentValue);
//       setLabel(model.name);
//       setOpen(false);
//     }}
//   >
//     <CheckIcon
//       className={cn(
//         "mr-2 h-4 w-4",
//         value === model.name ? "opacity-100" : "opacity-0",
//       )}
//     />
//     {model.name}
//   </CommandItem>
// ))}
