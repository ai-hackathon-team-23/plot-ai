/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import type {
  DragAndDropOptions,
  DropItem,
  TextDropItem,
} from "@adobe/react-spectrum";
import { ActionMenu, useDragAndDrop, useListData } from "@adobe/react-spectrum";
import type { ListData } from "@adobe/react-spectrum";
import { ListView, Item, Text } from "@adobe/react-spectrum";
import { ParameterCell } from "./parameter-cell";
import { useEffect, useState } from "react";
import { useModelNodesContext } from "~/app/_context/model-context";
import { TrashIcon } from "@radix-ui/react-icons";
import type { Node } from "reactflow";
import { type ModelListParams } from "./draggable-list-view";
interface Param {
  id: string;
  section: string;
  value: string;
  label: string;
  format: string;
  input: number;
  operator: string;
  visible: boolean;
}

interface DndListViewProps extends DragAndDropOptions {
  blockId: string;
  nodes: Node<ModelListParams>[]
}

export default function DroppableListView(props: DndListViewProps) {
  const { nodes, blockId, ...otherProps } = props;
  const { setNodes } = useModelNodesContext();
  const [currId, setCurrId] = useState(+blockId);
  const list: ListData<Param> = useListData({
    initialItems: [],
  });
  useEffect(() => {
    setCurrId(+blockId);
  }, []);

  useEffect(() => {
    setNodes((oldNodes) => {
      oldNodes[currId].data = list.items;
      return oldNodes;
    });
  }, [currId, list, setNodes]);

  const { dragAndDropHooks } = useDragAndDrop({
    // Only accept items with the following drag type
    acceptedDragTypes: [
      "custom-app-type-copy-default",
      "custom-app-type-reorder",
    ],

    getAllowedDropOperations: () => ["move"],

    getItems: (keys) =>
      [...keys].map((key) => {
        const item = list.getItem(key);
        // Setup the drag types and associated info for each dragged item.
        return {
          "custom-app-type-reorder": JSON.stringify(item),
          "text/plain": item.value,
        };
      }),
    onInsert: async (e) => {
      const { items, target } = e;

      const processedItems = await Promise.all(
        items.map(async (item) => ({
          ...JSON.parse(
            await (item as TextDropItem).getText(
              "custom-app-type-copy-default",
            ),
          ),
          id: Math.random().toString(36).slice(2),
        })),
      );

      if (target.dropPosition === "before") {
        list.insertBefore(target.key, ...processedItems);
      } else if (target.dropPosition === "after") {
        list.insertAfter(target.key, ...processedItems);
      }
    },
    onReorder: async (e) => {
      const { target, keys } = e;
      console.log("reorder");

      if (target.dropPosition === "before") {
        list.moveBefore(target.key, [...keys]);
      } else if (target.dropPosition === "after") {
        list.moveAfter(target.key, [...keys]);
      }
    },
    onRootDrop: async (e) => {
      const { items } = e;

      const processedItems = await Promise.all(
        items.map(async (item) => ({
          ...JSON.parse(
            await (item as TextDropItem).getText(
              "custom-app-type-copy-default",
            ),
          ),
          id: Math.random().toString(36).slice(2),
        })),
      );
      list.append(...processedItems);
    },
    ...otherProps,
  });

  const handleDelete = (item: Param) => {
    list.remove(item.id);
  };

  return (
    <div className="p-4">
      <ListView
        aria-label="Droppable ListView in drag into list example"
        selectionMode="single"
        selectionStyle="highlight"
        width="max-w-full"
        height="max-h-full"
        minWidth="size-3000"
        minHeight="size-2000"
        margin="mx-auto"
        dragAndDropHooks={dragAndDropHooks}
        items={list.items}
        density="compact"
      >
        {(item) => (
          <Item textValue={item.value}>
            <div className="mx-1 text-gray-500 hover:text-red-800">
              <TrashIcon onClick={() => handleDelete(item)} />
            </div>
            <ParameterCell
              id={item.id}
              section={item.section}
              value={item.value}
              label={item.label}
              format={item.format}
              input={item.input}
              operator={item.operator}
              visible={item.visible}
            />
          </Item>
        )}
      </ListView>
    </div>
  );
}
