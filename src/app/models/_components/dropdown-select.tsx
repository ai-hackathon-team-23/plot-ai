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
interface DropdownProps extends React.ComponentProps<typeof SelectTrigger> {
  size: string;
  placeholder: string;
  items: { value: string; label: string }[];
}

export function DropdownSelect({
  size,
  placeholder,
  items,
  className,
  ...props
}: DropdownProps) {
  return (
    <Select>
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
