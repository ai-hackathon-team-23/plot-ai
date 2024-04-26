"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  type NodeTypes,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import BlockComponent from "./block-react-flow";
import { useModelNodesContext } from "~/app/_context/model-context";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";
export default function Canvas({ modelId }: { modelId: string }) {
  const { setViewport } = useReactFlow();
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
    setEdges,
    setNodes,
  } = useModelNodesContext();

  const nodeTypes: NodeTypes = useMemo(
    () => ({ blockComp: BlockComponent }),
    [],
  );

  const handleSave = useCallback(() => {
    toast.loading("Saving...");
    if (nodes) {
      const flow = nodes.toObject();
      localStorage.setItem("model-flow", JSON.stringify(flow));
    }
    updateModel.mutate({
      modelId: modelId,
      modelObject: JSON.stringify({ nodes }),
    });
  }, [nodes]);

  const onRestore = useCallback(() => {
    const restoreFlow = () => {
      const flow = JSON.parse(localStorage.getItem("model-flow"));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

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
        // onInit={setNodes}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-right">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onRestore}>Restore</Button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
