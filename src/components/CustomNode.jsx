/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Handle, Position } from "reactflow";
import useStore from "../store";
import { useShallow } from "zustand/react/shallow";


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
function CustomNode({ data, isConnectable = true, id }) {
  const {
    nodes,
setNodes,
    clicked,
    setClicked
  } = useStore(useShallow(selector));



  const HandleClick = () => {
    const filterNodes = nodes.filter((node) => node.id != id);
    setNodes(filterNodes);
    setClicked(false)
  }
  return (
    <div
     onMouseEnter={(e) => e.target.querySelector('img').style.display = 'block'}
     onMouseLeave={(e) => e.target.querySelector('img').style.display = 'none'}
      style={{
        columnGap: "5px",
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40px",
        width: "90px",
        border: "2px solid",
        borderRadius: "4px",
      }}
    >
      <h6>{data.label}</h6>
      <img onClick={HandleClick} style={{display: 'none' }} src="src/assets/delete.svg" alt="" height={16} width={16} />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
