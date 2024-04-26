"use client";

import React, { memo, useState } from "react";
import DroppableListView from "./droppable-list-view";
import { Handle, Position } from "reactflow";
import { useListData } from "@adobe/react-spectrum";
import { useModelNodesContext } from "~/app/_context/model-context";

const onConnect = (params) => console.log("handle onConnect", params);

const BlockComponent = () => {
  const { blockId } = useModelNodesContext();
  const targetList = useListData({
    initialItems: [],
  });


  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} onConnect={onConnect} />

      <div className="relative">
        <div className="">
          <DroppableListView list={targetList} blockId={blockId} />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(BlockComponent);
