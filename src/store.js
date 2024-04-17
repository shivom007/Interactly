import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import random from 'random'
const savedNodes = localStorage.getItem("nodes");
const savedEdges = localStorage.getItem("edges");

const useStore = create((set, get) => ({
  clicked : false,
  setClicked : (clicked) => set({clicked}), 
  nodes: savedNodes ? JSON.parse(savedNodes) : [],
  edges: savedEdges ? JSON.parse(savedEdges) : [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
    const newNodes = [...get().nodes];
    localStorage.setItem("nodes", JSON.stringify(newNodes));
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    const newEdges = [...get().edges];
    localStorage.setItem("edges", JSON.stringify(newEdges));
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
    const newEdges = [...get().edges];
    localStorage.setItem("edges", JSON.stringify(newEdges));
  },
  setNodes: (nodes) => {
    set({ nodes });
    const newNodes = [...get().nodes];
    localStorage.setItem("nodes", JSON.stringify(newNodes));
  },
  setEdges: (edges) => {
    set({ edges });
    const newEdges = [...get().edges];
    localStorage.setItem("edges", JSON.stringify(newEdges));
  },
  addNode: () => {
    const newNodes = [...get().nodes];
    const newNode = {
      id: `${random.int(0, 100)}`,
      type: "custom",
      data: { label: `New Node ${random.int(0, 100)}`},
      position: { x: random.int(50, 200), y:  random.int(50, 200) },
    };
    newNodes.push(newNode);
    set({ nodes: newNodes });
    localStorage.setItem("nodes", JSON.stringify(newNodes));
  },
}));

export default useStore;
