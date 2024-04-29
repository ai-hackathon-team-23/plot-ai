"use client";

import React, { memo, useEffect, useState } from "react";
import DroppableListView from "./droppable-list-view";
import { Handle, Position, useNodeId } from "reactflow";
import { useModelNodesContext } from "~/app/_context/model-context";
import { Input } from "~/components/ui/input";

const onConnect = (params) => console.log("handle onConnect", params);

const BlockComponent = () => {
  const [total, setTotal] = useState(0);
  const { nodes } = useModelNodesContext();
  const nodeId = useNodeId();
  useEffect(() => {
    const newTotal = targetList.items.reduce((acc, item) => acc + item.input, 0)
    setTotal(newTotal)
  }, [targetList.items])

  console.log(total)


  return (
    <div className="relative">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="tytle" placeholder="Title" className="border-none"/>
      </div>
      <Handle type="target" position={Position.Left} onConnect={onConnect} />
      <div className="relative">
        <div className="">
          <DroppableListView  nodes={nodes} blockId={nodeId}/>
        </div>
            <div className="custom-drag-handle absolute top-0 bottom-0 left-0 w-3 bg-white custom-drag-handle"></div>
            <div className="custom-drag-handle absolute top-0 bottom-0 right-0 w-3 bg-white custom-drag-handle"></div>
            <div className="custom-drag-handle absolute left-0 right-0 top-0 h-3 bg-white custom-drag-handle"></div>
            <div className="custom-drag-handle absolute left-0 right-0 bottom-0 h-3 bg-white custom-drag-handle"></div>
      </div>
      <Handle type="source" position={Position.Right} />
      <div className="flex w-full max-w-sm items-center space-x-2 bg-grey-200">
        <Input type="text" disabled placeholder="" value={total > 0 ? `$${total}` : ''} className="flex-1 text-right pr-4 mx-4 border-none"/>
      </div>
    </div>
  );
};

export default memo(BlockComponent);
