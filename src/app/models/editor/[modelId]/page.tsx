"use client"
import React from "react";
import { Canvas } from "../../_components/canvas";
import { EditBar } from "../../_components/edit-bar-container";
import {defaultTheme, Provider} from '@adobe/react-spectrum';
import { Flex, useListData } from "@adobe/react-spectrum";
import DraggableListView from "../../_components/draggable-list-view";
import DroppableListView from "../../_components/droppable-list-view";
import { PARAMS } from "../../_constants/constants";

type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  const sourceList = useListData({
    initialItems: PARAMS
  });

  const targetList = useListData({
    initialItems: [
      
    ],
  });

  return (
    <Provider theme={defaultTheme}  colorScheme="light">
    <div className="flex items-center justify-center align-middle">
      <div className="grid grid-rows-3 grid-flow-col">
        <div className="row-span-3 justify-left pr-1">
          <DraggableListView list={sourceList} />
        </div>
        <div className="justify-right">
          <EditBar />
          <div className="pt-1">
            <DroppableListView list={targetList} />
          </div>
          {/* <Canvas/> */}
        </div>
      </div>
    </div>
    </Provider>
  );
};

export default ModelCreatorView;
