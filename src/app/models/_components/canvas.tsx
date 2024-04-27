"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const savedModel = api.models.get.useQuery({ modelId });
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
    rfInstance,
    setRfInstance,
  } = useModelNodesContext();

  const nodeTypes: NodeTypes = useMemo(
    () => ({ blockComp: BlockComponent }),
    [],
  );

  useEffect(() => {
    if (savedModel.data !== undefined) {
      const flow = JSON.parse(savedModel.data.data);
      if (flow !== null) {
        if (flow.edges !== null) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      }
    }
  }, [savedModel.data]);

  const handleSave = useCallback(() => {
    toast.loading("Saving...");

    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      const toObjectRf = { nodes, edges, viewport: flow.viewport };
      console.log(toObjectRf);
      updateModel.mutate({
        modelId: modelId,
        modelObject: JSON.stringify(toObjectRf),
      });
    }
  }, [modelId, rfInstance, updateModel]);

  const onRestore = useCallback(() => {
    const restoreFlow = () => {
      const flow = JSON.parse(savedModel.data.data);
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
        onInit={setRfInstance}
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

