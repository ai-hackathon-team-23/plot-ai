"use client"
import React from "react";
import { ParameterList } from "../../_components/parameter-list";
import { Canvas } from "../../_components/canvas";
import { EditBar } from "../../_components/edit-bar-container";
import { SearchBar } from "../../_components/search-bar";
import { ParameterListSearch } from "../../_components/parameter-list-search";
import DragIntoList from "../../_components/drag-into-list";

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
        <div className="row-span-3 justify-left">
          {/* <ParameterListSearch/> */}
          <DraggableListView list={sourceList} />
    
        </div>
        <div className="justify-right">
          <EditBar />
          <DroppableListView list={targetList} />
          {/* <Canvas/> */}
        </div>
      </div>
    </div>
    </Provider>
  );
};

export default ModelCreatorView;
