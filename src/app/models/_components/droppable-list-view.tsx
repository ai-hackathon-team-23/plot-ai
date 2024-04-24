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

    onInsert: async (e) => {
      const {
        items,
        target
      } = e;
      console.log(e)

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
    onReorder: async (e) => {
      const {
        target,
        keys
      } = e
      console.log(keys)
      const index = [...keys][0]
      const item = list.getItem(index);

      console.log(item)

      if (target.dropPosition === 'before') {
        list.remove(index);
        list.insertBefore(target.key, item);
      } else if (target.dropPosition === 'after') {
        list.remove(index);
        list.insertAfter(target.key, item);
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