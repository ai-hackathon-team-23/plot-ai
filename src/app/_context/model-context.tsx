"use client";
import {
  createContext,
  type HTMLAttributes,
  useContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import type { ModelListParams } from "../models/_components/draggable-list-view";
import {
  type Edge,
  type NodeChange,
  useEdgesState,
  useNodesState,
  type Node,
  type EdgeChange,
  useReactFlow,
} from "reactflow";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

interface ContextProps {
  nodes: Node<ModelListParams, string | undefined>[];
  setNodes: Dispatch<
    SetStateAction<Node<ModelListParams, string | undefined>[]>
  >;
  onNodesChange: OnChange<NodeChange>;
  edges: Edge<unknown>[];
  setEdges: Dispatch<SetStateAction<Edge<unknown>[]>>;
  onEdgesChange: OnChange<EdgeChange>;
  onConnect: (params: unknown) => void;
  onConnectStart: (_: unknown, { nodeId }: { nodeId: unknown }) => void;
  onConnectEnd: (event: unknown) => void;
  blockId: string;
  focus: unknown;
  setFocus: Dispatch<SetStateAction<undefined>>;
  updatedItem: unknown;
  setUpdatedItem: Dispatch<SetStateAction<undefined>>;
}

let id = 0;
const getId = () => `${++id}`;
const initialNodes: Node<ModelListParams>[] = [
  {
    id: id.toString(),
    type: "blockComp",
    data: [] as never,
    // Specify the custom class acting as a drag handle
    dragHandle: ".custom-drag-handle",

    style: {
      border: "2px solid #ddd",
      background: "white",
      borderRadius: "8px",
    },
    position: { x: 0, y: 0 },
  },
];

const ModelNodesContext = createContext<ContextProps>({
  nodes: initialNodes,
  setNodes: () => null,
  onNodesChange: () => null,
  edges: [],
  setEdges: () => null,
  onEdgesChange: () => null,
  onConnect: () => null,
  onConnectEnd: () => null,
  onConnectStart: () => null,
  blockId: "",
  focus: null,
  setFocus: () => null,
  updatedItem: null,
  setUpdatedItem: () => null,
});
const ModelNodesContextProvider = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  const [focus, setFocus] = useState();
  const [updatedItem, setUpdatedItem] = useState();
  const blockId = useRef(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

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
          id: id,
          type: "blockComp",
          dragHandle: ".custom-drag-handle",
          position: screenToFlowPosition({
            x: event.clientX as number,
            y: event.clientY as number,
          }),
          style: {
            border: "2px solid #ddd",
            background: "white",
            borderRadius: "8px",
          },
          data: [],
          // data: { label: nodes.at(connectingNodeId - 1)?.data.label },
          // origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id: id,
            source: connectingNodeId.current,
            target: id,
          }),
        );
      }
    },
    [screenToFlowPosition],
  );

  return (
    <ModelNodesContext.Provider
      value={{
        edges,
        nodes,
        onEdgesChange,
        onNodesChange,
        setEdges,
        setNodes,
        onConnect,
        onConnectEnd,
        onConnectStart,
        blockId: id.toString(),
        focus,
        setFocus,
        updatedItem,
        setUpdatedItem,
      }}
    >
      {children}
    </ModelNodesContext.Provider>
  );
};

const useModelNodesContext = () => useContext(ModelNodesContext);

export { ModelNodesContextProvider, useModelNodesContext };