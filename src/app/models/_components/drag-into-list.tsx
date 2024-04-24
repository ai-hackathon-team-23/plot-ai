"use client";
import { Flex, useListData } from "@adobe/react-spectrum";
import DraggableListView from "./draggable-list-view";
import DroppableListView from "./droppable-list-view";

export default function DragIntoList() {
  const sourceList = useListData({
    initialItems: [
      {
        id: 1,
        value: "bathrooms",
        name: "Bathrooms",
        format: "number",
        functionality: () => {},
      },
      {
        id: 2,
        value: "bedrooms",
        name: "Bedrooms",
        format: "number",
        functionality: () => {},
      },
      {
        id: 3,
        value: "deckArea",
        name: "Deck Area",
        format: "size",
        functionality: () => {},
      },
      {
        id: 4,
        value: "roomsCount",
        name: "Room Count",
        format: "number",
        functionality: () => {},
      },
      {
        id: 5,
        value: "squareFeet",
        name: "Square Feet",
        format: "size",
        functionality: () => {},
      },
      {
        id: 6,
        value: "stories",
        name: "Stories",
        format: "number",
        functionality: () => {},
      },
      {
        id: 7,
        value: "unitsCount",
        name: "Unit Count",
        format: "number",
        functionality: () => {},
      },
      {
        id: 8,
        value: "lotSquareFeet",
        name: "Lot Square Feet",
        format: "size",
        functionality: () => {},
      },
    ],
  });

  const targetList = useListData({
    initialItems: [
     
    ],
  });

  return (
    <Flex wrap gap="size-300">
      <DraggableListView list={sourceList} />
      <DroppableListView list={targetList} />
    </Flex>
  );
}
