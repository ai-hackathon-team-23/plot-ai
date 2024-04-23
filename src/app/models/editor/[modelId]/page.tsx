import React from "react";
import { ParameterList } from "../../_components/parameter-list";
import { Canvas } from "../../_components/canvas";
import { EditBar } from "../../_components/edit-bar-container";
import { SearchBar } from "../../_components/search-bar";

type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div className="flex items-center justify-center align-middle">
      <div className="grid grid-rows-3 grid-flow-col">
        <div className="row-span-3 justify-left">
          <SearchBar />
          <ParameterList />
        </div>
        <div className="justify-right">
          <EditBar />
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default ModelCreatorView;
