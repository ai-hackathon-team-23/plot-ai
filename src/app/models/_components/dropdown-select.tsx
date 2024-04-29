import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "~/lib/utils";
import { useEffect } from "react";
interface DropdownProps extends React.ComponentProps<typeof SelectTrigger> {
  size: string;
  placeholder: string;
  items: { value: string; label: string }[];
  onValueChange: string;
}

export function DropdownSelect({
  size,
  placeholder,
  items,
  className,
  onValueChange,
  value,
  ...props
}: DropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn(size, className)} {...props}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem value={item.value} key={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
