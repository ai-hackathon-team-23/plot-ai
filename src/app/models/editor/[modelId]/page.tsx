import React from 'react'

type Props = {
  params: { modelId: string }
}

const ModelCreatorView = ({ params }: Props) => {
  const { modelId } = params;

  return (
    <div>{modelId}</div>
  )
}

export default ModelCreatorView