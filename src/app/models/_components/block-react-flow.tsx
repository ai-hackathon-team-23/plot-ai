"use client";

import React, { memo, useState } from "react";
import DroppableListView from "./droppable-list-view";
import { Handle, Position } from "reactflow";
import { useListData } from "@adobe/react-spectrum";
import { useModelNodesContext } from "~/app/_context/model-context";
import { nullable } from "zod";

const onConnect = (params) => console.log("handle onConnect", params);

const BlockComponent = () => {
  const { blockId, nodes } = useModelNodesContext();
  console.log("NODES: ", nodes[0].data);
  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} onConnect={onConnect} />

      <div className="relative">
        <div className="">
          <DroppableListView blockId={blockId} nodes={nodes} />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(BlockComponent);
