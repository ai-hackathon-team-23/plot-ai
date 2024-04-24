import React from "react";
import type { DragAndDropOptions } from "@adobe/react-spectrum";
import { useDragAndDrop } from "@adobe/react-spectrum";
import type { ListData } from "@adobe/react-spectrum";
import { ListView, Item, Text } from "@adobe/react-spectrum";

interface Item {
  name: string;
  type?: string;
  childNodes?: Item[];
}
interface DndListViewProps extends DragAndDropOptions {
  list: ListData<Item>;
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
          "text/plain": item.name,
        };
      }),
    onDragEnd: (e) => {
      const { dropOperation, keys } = e;

      if (dropOperation === "move") {
        list.remove(...keys);
      }
    },
    ...otherProps,
  });

  return (
    <ListView
      aria-label="Draggable ListView in drag into list example"
      selectionMode="multiple"
      width="size-3600"
      height="size-2400"
      dragAndDropHooks={dragAndDropHooks}
      items={list.items}
    >
      {(item) => (
        <Item textValue={item.name}>
          <Text>{item.name}</Text>
        </Item>
      )}
    </ListView>
  );
}

export default DraggableListView;
