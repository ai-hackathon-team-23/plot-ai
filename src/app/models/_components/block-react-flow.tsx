"use client";

import React, { memo } from "react";
import { useCallback } from "react";
import DroppableListView from "./droppable-list-view";
import { Handle, Position } from 'reactflow';
import { useListData } from "@adobe/react-spectrum";

const onConnect = (params) => console.log('handle onConnect', params);

const BlockComponent = () => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const targetList = useListData({
    initialItems: [
      
    ],
  });

  return (
    <div className="relative">
        <Handle type="target" position={Position.Left} onConnect={onConnect} />

        <div className="relative">
            <div className="mx-auto max-w-full">
                <DroppableListView list={targetList}/>
            </div>
            {/* <div className="custom-drag-handle absolute top-0 bottom-0 left-0 w-3 bg-white custom-drag-handle hover:bg-gray-300 rounded"></div> */}
            {/* <div className="custom-drag-handle absolute top-0 bottom-0 right-0 w-3 bg-white custom-drag-handle hover:bg-gray-300 rounded"></div> */}
            <div className="custom-drag-handle absolute left-0 right-0 top-0 h-3 bg-white custom-drag-handle hover:bg-gray-200 rounded"></div>
            <div className="custom-drag-handle absolute left-0 right-0 bottom-0 h-3 bg-white custom-drag-handle hover:bg-gray-200 rounded"></div>
        </div>
        <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(BlockComponent);