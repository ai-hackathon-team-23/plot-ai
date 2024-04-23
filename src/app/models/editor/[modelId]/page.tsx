import React from 'react'
import { Canvas } from '../../_components/canvas';

type Props = {
  params: { modelId: string }
}

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div>
      <Canvas />
    </div>
  )
}

export default ModelCreatorView