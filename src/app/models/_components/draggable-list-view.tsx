
"use client"
import React from "react";
import type { DragAndDropOptions } from "@adobe/react-spectrum";
import { Section, useDragAndDrop } from "@adobe/react-spectrum";
import type { ListData } from "@adobe/react-spectrum";
import { ListView, Item, Text } from "@adobe/react-spectrum";
import { ParameterCell } from "./parameter-cell";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface Param {
  id: string;
  sectionHeader: boolean
  section: string;
  value: string;
  label: string;
  format: string;
  functionality?: () => void;
}
interface DndListViewProps extends DragAndDropOptions {
  list: ListData<Param>;
}

function DraggableListView(props: DndListViewProps) {

  const { list, ...otherProps } = props;
  const { dragAndDropHooks } = useDragAndDrop({
    // Only allow move operations when dropping items from this list
    getAllowedDropOperations: () => ["move"],
    getItems: (keys) =>
      [...keys].map((key) => {
        const item = list.getItem(key);
        // Setup the drag types and associated info for each dragged item.
        return {
          "custom-app-type": JSON.stringify(item),
          "text/plain": item.value,
        };
      }),
    ...otherProps,
  });

  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[840px] ">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="test">
            <ListView
              aria-label="Draggable ListView in drag into list example"
              selectionMode="multiple"
              width="size-3600"
              height="100vh"
              dragAndDropHooks={dragAndDropHooks}
              items={list.items}
            >
              {(item) => (

                  <Item textValue={item.value}>
                    <ParameterCell  
                      id={item.id} 
                      sectionHeader={item.sectionHeader}
                      section={item.section} 
                      value={item.value} 
                      label={item.label} 
                      format={item.format} 
                      functionality={item.functionality}
                    />
                  </Item>

              )}
            </ListView>
          </CommandGroup>
        </CommandList>

    </Command>
  );
}

export default DraggableListView;
