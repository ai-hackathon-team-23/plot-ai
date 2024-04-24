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
      
    ],
  });

  return (
    <>
      <DroppableListView list={targetList} />
    </>
  );
};

export default BlockComponent;