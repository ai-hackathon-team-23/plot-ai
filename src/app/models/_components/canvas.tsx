"use client";
import { useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  type NodeTypes,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import BlockComponent from "./block-react-flow";
import { useModelNodesContext } from "~/app/_context/model-context";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";
export default function Canvas({ modelId }: { modelId: string }) {
  const ReactFlowWrapper = useRef(null);
  const updateModel = api.models.update.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Saved");
    },
  });
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

  const handleSave = async () => {
    toast.loading("Saving...");
    updateModel.mutate({
      modelId: modelId,
      modelObject: nodes,
    });
  };

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
        <Panel position="top-right">
          <Button onClick={handleSave}>Save</Button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
