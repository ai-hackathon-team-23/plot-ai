"use client";
import React, { useState } from "react";
import type { DragAndDropOptions } from "@adobe/react-spectrum";
import { useDragAndDrop } from "@adobe/react-spectrum";
import type { ListData } from "@adobe/react-spectrum";
import { ListView, Item } from "@adobe/react-spectrum";
import { ParameterCell } from "./parameter-cell";
import { SECTION_HEADERS } from "../_constants/constants";
import { Input } from "~/components/ui/input";
import {
  DragHandleDots2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

interface Param {
  id: string;
  sectionHeader: boolean;
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
    getItems: (keys) =>
      [...keys].map((key) => {
        const item = list.getItem(key);
        console.log(item);
        // Setup the drag types and associated info for each dragged item.
        return {
          'custom-app-type-copy-default': JSON.stringify(item),
          "text/plain": item.value,
        };
      }),
    ...otherProps,
  });

  const [filter, setFilter] = useState("");

  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredItems = list.items.filter((item) =>
    item.label.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <div>
        <div className="relative pb-1">
          <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type a parameter to search..."
            className="rounded-none border bg-white p-4 pl-8"
            value={filter}
            onChange={handleSearchChange}
          />
        </div>
        {SECTION_HEADERS.map((header) => {
          const itemsInSection = filteredItems.filter(
            (param) => param.section === header,
          );

          return (
            <>
              <h1 className="flex min-w-60 justify-center border bg-white p-2 text-center font-bold">
                {header}
              </h1>
              {itemsInSection.length !== 0 ? (
                <ListView
                  aria-label="Draggable Parameters List"
                  selectionMode="single"
                  selectionStyle="highlight"
                  width="size-3000"
                  dragAndDropHooks={dragAndDropHooks}
                  items={itemsInSection}
                >
                  {(item) => (
                    <Item textValue={item.value}>
                      <ParameterCell
                        id={item.id}
                        key={item.id}
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
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default DraggableListView;
