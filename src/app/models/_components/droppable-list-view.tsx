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

interface DndListViewProps extends DragAndDropOptions {
  nodes: Node<ModelListParams>[];
}

export default function DroppableListView(props: DndListViewProps) {
  const { ...otherProps } = props;
  const { setNodes, nodes, blockId } = useModelNodesContext();
  const [currId, setCurrId] = useState(blockId.current);
  const [initRender, setInitRender] = useState(false);
  const list = useListData({
    initialItems: [],
  });

  useEffect(() => {
    // console.log("BLOCK ID \n", blockId.current);
    setCurrId(blockId.current);
    blockId.current++;

    return () => {
      blockId.current--;
    };
  }, []);

  // MOVING STATE FROM REACT-SPECTRUM LIST STATEMANAGEMNET TO REACT-FLOW GLOABAL STATE MANAGEMENT
  useEffect(() => {
    if (nodes[currId] && list.items.length > 0) {
      setNodes((oldNodes) => {
        // console.log(`NODE ${currId} DATA`, nodes[currId]);
        oldNodes[currId].data = [...list.items];
        return oldNodes;
      });
    }
  }, [currId, list, setNodes]);

  // MOVING STATE FROM REACT-FLOW GLOABAL LIST STATEMANAGEMNET TO REACT-SPECTRUM STATE MANAGEMENT
  useEffect(() => {
    if (nodes[currId] && initRender == false) {
      if (nodes[currId].data !== undefined) {
        const nodeList = [...nodes[currId].data];
        // console.log(nodeList)
        // console.log("NODELIST ", currId, nodeList);
        if (nodeList.length > 0) {
          console.log("NODE LIST \n", nodeList);
          for (let i = nodeList.length; i >= 0; i--) {
            list.append(nodeList[i]);
          }
          // list.items = nodes[currId].data;
          // console.log(`${currId}`,list.items)
          setInitRender(true);
        }
      }
    }
  }, [currId, nodes]);

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
          blockId: currId,
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
          blockId: currId,
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
    <div className="p-1">
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
