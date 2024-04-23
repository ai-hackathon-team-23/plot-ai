import React from 'react'
import { ParameterList } from '../../_components/parameter-list';
import { Canvas } from '../../_components/canvas';
import { EditBar } from "../../_components/edit-bar-container";

type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div className="flex h-full">
      <ParameterList/>
      <Canvas />
    </div>
  )
}

      {modelId}
    </div>
  );
};

export default ModelCreatorView;
