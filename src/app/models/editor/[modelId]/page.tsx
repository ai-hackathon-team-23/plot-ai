import React from 'react'
import { ParameterList } from '../../_components/parameter-list';

type Props = {
  params: { modelId: string }
}

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div className="flex h-full">
      <ParameterList/>
      <div className="flex-grow">
        {modelId}
      </div>
    </div>
  )
}

export default ModelCreatorView