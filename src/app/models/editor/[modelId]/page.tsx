"use client";
import React from "react";
import { EditBar } from "../../_components/edit-bar-container";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { useListData } from "@adobe/react-spectrum";
import DraggableListView from "../../_components/draggable-list-view";
import { PARAMS } from "../../_constants/constants";
import { ReactFlowProvider } from "reactflow";
import { ModelNodesContextProvider } from "~/app/_context/model-context";
import Canvas from "../../_components/canvas";
type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  const sourceList = useListData({
    initialItems: PARAMS,
  });

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <ReactFlowProvider>
        <ModelNodesContextProvider>
          <div className="flex items-center justify-center align-middle h-[90%] overflow-hidden">
            <div className="grid grid-flow-col grid-rows-3">
              <div className="justify-left row-span-3 pr-1">
                <DraggableListView list={sourceList} />
              </div>
              <div className="justify-right">
                <EditBar />
                <Canvas />
              </div>
            </div>
          </div>
        </ModelNodesContextProvider>
      </ReactFlowProvider>
    </Provider>
  );
};

export default ModelCreatorView;
