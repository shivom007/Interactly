import ReactFlow, {
  Background,
  Controls,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import CustomNode from "./CustomNode";
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  setNodes: state.setNodes,
  clicked: state.clicked,
  setClicked: state.setClicked
});
const nodeTypes = {
  custom: CustomNode,
};

// eslint-disable-next-line react/prop-types

const Home = () => {
  const [id, setId] = useState("");
  const [label, setLabel] = useState("");
 
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    clicked,
    setClicked
  } = useStore(useShallow(selector));
  const handleAdd = () => {
    addNode();
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  const onNodeClick = (_, node) => {
    setClicked(true)
    setLabel(node.data.label);
    setId(node.id);
    
  };
  const handleUpdate = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: label,
            },
          };
        }
        return node;
      })
    );
  };
 const handleDel = () => {
  const filterNodes = nodes.filter((node) => node.id != id);
  setNodes(filterNodes);
  setClicked(false)
 } 
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={(nodes) => onNodesChange(nodes)}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        {
          
          clicked && (
            <Panel
              style={{
                borderRadius: "16px",
                height: "400px",
                width: "300px",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "yellow",
                position: "absolute",
                right: 0,
                top: 200,
              }}
            >
              <div
                style={{
                  rowGap: "20px",
                  columnGap: "50px",
                  height: "400px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  onChange={(e) => setLabel(e.target.value)}
                  style={{
                    height: "40px",
                    width: "250px",
                    border: "none",
                    borderRadius: "4px",
                    paddingLeft: "16px",
                    outlineColor: "red",
                  }}
                  value={label}
                  type="text"
                  placeholder=""
                />
                <button
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "270px",
                    color: "white",
                    backgroundColor: "#041E49",
                  }}
                  onClick={handleUpdate}
                >
                  update
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "270px",
                    color: "white",
                    backgroundColor: "#041E49",
                  }}
                  onClick={handleDel}
                >
                  delete
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "270px",
                    color: "white",
                    backgroundColor: "#041E49",
                  }}
                  onClick={() => setClicked(false)}
                >
                  close
                </button>
                
              </div>
            </Panel>
          )
        }
        <Panel
          onClick={handleAdd}
          style={{
            display: "flex",
            height: "40px",
            width: "80px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
          }}
          position="top-left"
        >
          <button
            style={{
              backgroundColor: "inherit",
              color: "inherit",
              height: "40px",
              width: "80px",
              borderRadius: "10px",
            }}
          >
            add
          </button>
        </Panel>
        <Panel
          onClick={handleReset}
          style={{
            display: "flex",
            height: "40px",
            width: "80px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
          }}
          position="top-right"
        >
          <button
            style={{
              backgroundColor: "inherit",
              color: "inherit",
              height: "40px",
              width: "80px",
              borderRadius: "10px",
            }}
          >
            reset
          </button>
        </Panel>

        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Home;
