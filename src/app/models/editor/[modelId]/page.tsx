import React from "react";
import { EditBar } from "../../_components/edit-bar-container";

type Props = {
  params: { modelId: string };
};

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div>
      <div className="pb-10">
        <EditBar />
      </div>

      {modelId}
    </div>
  );
};

export default ModelCreatorView;
