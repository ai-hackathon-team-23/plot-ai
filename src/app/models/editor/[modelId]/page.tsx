"use client";
import React from "react";
import { ParameterList } from "../../_components/parameter-list";
import { Canvas } from "../../_components/canvas";
import { EditBar } from "../../_components/edit-bar-container";
import { SearchBar } from "../../_components/search-bar";
import { ParameterListSearch } from "../../_components/parameter-list-search";
import { defaultTheme, Provider, lightTheme } from "@adobe/react-spectrum";

type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <Provider theme={lightTheme}>
      <div className="flex items-center justify-center align-middle">
        <div className="grid grid-flow-col grid-rows-3">
          <div className="justify-left row-span-3">
            <ParameterListSearch />
          </div>
          <div className="justify-right">
            <EditBar />
            <Canvas />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default ModelCreatorView;
