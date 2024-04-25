"use client";
import { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Node,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import BlockComponent from './block-react-flow';

// const initialNodes = [
//   {
//     id: '0',
//     data: { label: 'Hello' },
//     position: { x: 0, y: 0 },
//     type: "blockComp",
//   },
// ];

const initialNodes = [
  {
    id: '2',
    type: 'blockComp',

    // Specify the custom class acting as a drag handle
    dragHandle: '.custom-drag-handle',

    style: {
      border: '2px solid #ddd',
      background: 'white',
      borderRadius: '8px',
    },
    position: { x: 0, y: 0 },
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

  const onConnect = useCallback(
    (params) => {
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds))
    },
    []
  );

  const onConnectStart = useCallback((_, {nodeId}) => {
    connectingNodeId.current = nodeId;
  },
  []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        console.log('Creating new node')
        const id = getId();
        const newNode = {
          id,
          type: 'blockComp',
          dragHandle: '.custom-drag-handle',
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          style: {
            border: '2px solid #ddd',
            background: 'white',
            borderRadius: '8px',
          }
          // data: { label: nodes.at(connectingNodeId - 1)?.data.label },
          // origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => 
          eds.concat({ id, source: connectingNodeId.current, target: id}),
          );
        
      }
    },
    [screenToFlowPosition]
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

export const Canvas = () => (
  <ReactFlowProvider>
    <Flow>

    </Flow>
  </ReactFlowProvider>
);
