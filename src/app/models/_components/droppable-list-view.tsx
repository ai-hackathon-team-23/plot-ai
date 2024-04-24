/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import type { DragAndDropOptions, TextDropItem } from "@adobe/react-spectrum";
import { useDragAndDrop } from "@adobe/react-spectrum";
import type { ListData } from "@adobe/react-spectrum";
import {ListView, Item, Text } from "@adobe/react-spectrum";
import { ParameterCell } from "./parameter-cell";



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

export default function DroppableListView(props: DndListViewProps) {
  const { list, ...otherProps } = props;
  const { dragAndDropHooks } = useDragAndDrop({
    // Only accept items with the following drag type
    acceptedDragTypes: ['custom-app-type'],
    onInsert: async (e) => {
      const {
        items,
        target
      } = e;

      const processedItems = await Promise.all(
        items.map(async (item) =>
          JSON.parse(await (item as TextDropItem).getText('custom-app-type'))
        )
      );

      if (target.dropPosition === 'before') {
        list.insertBefore(target.key, ...processedItems);
      } else if (target.dropPosition === 'after') {
        list.insertAfter(target.key, ...processedItems);
      }
    },
    onRootDrop: async (e) => {
      const {
        items
      } = e;
      const processedItems = await Promise.all(
        items.map(async (item) =>
          JSON.parse(await (item as TextDropItem).getText('custom-app-type'))
        )
      );
      list.append(...processedItems);
    },
    ...otherProps
  });

  return (
    <ListView
      aria-label="Droppable ListView in drag into list example"
      width="size-3600"
      height="size-2400"
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
  );
}