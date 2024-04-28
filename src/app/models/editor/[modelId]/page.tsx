"use client";
import React, { useState, useEffect } from "react";
import { EditBar } from "../../_components/edit-bar-container";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { useListData } from "@adobe/react-spectrum";
import DraggableListView from "../../_components/draggable-list-view";
import { PARAMS } from "../../_constants/constants";
import { ReactFlowProvider } from "reactflow";
import { ModelNodesContextProvider } from "~/app/_context/model-context";
import Canvas from "../../_components/canvas";
import { getServerAuthSession } from "~/server/auth";
type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  const [blockTitle, setBlockTitle] = useState("");
  const [blockAction, setBlockAction] = useState("");
  const [cellTitle, setCellTitle] = useState("");
  const [cellValue, setCellValue] = useState("");
  const [cellOperator, setCellOperator] = useState("");
  const [cellVisible, setCellVisible] = useState(true);

  const handleBlockActionChange = (value: string) => {
    setBlockAction(value);
  };

  const handleCellValueChange = (value: string) => {
    setCellValue(value);
  };

  const handleOperatorChange = (value: string) => {
    setCellOperator(value);
  };

  const handleSetVisible = (cellVisible: boolean) => {
    setCellVisible(cellVisible);
  };

  // useEffect(() => {
  //   console.log();
  // }, []);

  const sourceList = useListData({
    initialItems: PARAMS,
  });

  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <ReactFlowProvider>
        <ModelNodesContextProvider modelId={modelId}>
          <div className="flex items-center justify-center align-middle">
            <div className="grid grid-flow-col grid-rows-3">
              <div className="justify-left row-span-3 pr-1">
                <DraggableListView list={sourceList} />
              </div>
              <div className="justify-right">
                <EditBar
                  blockTitle={"Block Title"}
                  blockAction={blockAction}
                  setBlockAction={handleBlockActionChange}
                  cellTitle={"Cell Title"}
                  cellValue={cellValue}
                  setCellValue={handleCellValueChange}
                  cellOperator={cellOperator}
                  setCellOperator={handleOperatorChange}
                  cellVisible={cellVisible}
                  setCellVisible={handleSetVisible}
                />
                <Canvas modelId={modelId}/>
              </div>
            </div>
          </div>
        </ModelNodesContextProvider>
      </ReactFlowProvider>
    </Provider>
  );
};

export default ModelCreatorView;
