"use client";
import { useMemo, useRef } from "react";
import ReactFlow, { Controls, Background, type NodeTypes } from "reactflow";
import "reactflow/dist/style.css";
import BlockComponent from "./block-react-flow";
import { useModelNodesContext } from "~/app/_context/model-context";

export default function Canvas() {
  const ReactFlowWrapper = useRef(null);
  const {
    edges,
    nodes,
    onEdgesChange,
    onNodesChange,
    onConnect,
    onConnectEnd,
    onConnectStart,
  } = useModelNodesContext();

  const nodeTypes: NodeTypes = useMemo(
    () => ({ blockComp: BlockComponent }),
    [],
  );
  return (
    <div style={{ height: 800 }} ref={ReactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
