"use client";
import { useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Node,
  type NodeTypes 
} from "reactflow";
import BlockComponent from "./block-react-flow";
import "reactflow/dist/style.css";

const Component = () => {
  return <div>sdfsdf</div>;
};

const initialNodes: Node[] = [
  {
    id: "0",
    data: "text",
    position: { x: 0, y: 0 },
    type: "blockComp",
  },
];

let id = 1;
const getId = () => `${id++}`;

const Flow = () => {
  const ReactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const nodeTypes: NodeTypes = useMemo(() => ({ blockComp: BlockComponent }), []);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [],
  // );

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        console.log("Creating new node");
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: nodes.at(connectingNodeId - 1)?.data.label },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [screenToFlowPosition],
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
};

export const Canvas = () => (
  <ReactFlowProvider>
    <Flow></Flow>
  </ReactFlowProvider>
);
