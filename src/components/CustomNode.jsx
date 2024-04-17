/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Handle, Position } from "reactflow";

function CustomNode({ data, isConnectable = true, id }) {
  return (
    <div
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

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
