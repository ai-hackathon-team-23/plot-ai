"use client";

import React from "react";
import { useCallback } from "react";
import DroppableListView from "./droppable-list-view";
import { useListData } from "@adobe/react-spectrum";

// type Props = {};"use client";

const handleStyle = { left: 10 };

const BlockComponent = () => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const targetList = useListData({
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
    ],
  });

  return (
    <>
      <DroppableListView list={targetList} />
    </>
  );
};

export default BlockComponent;
