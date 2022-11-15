import React from "react";

import "./toast.css";
import { ReactComponent as CrossIcon } from "../../../images/close-line-icon.svg";

const Toast = ({ toast, setAlert }) => {
  return (
    <div
      className="toast"
      data-name={toast.visible}
      style={{
        backgroundColor: `${
          toast.type === "success" ? "rgb(9, 158, 54)" : "rgb(214, 10, 10)"
        }`,
      }}
    >
      <CrossIcon
        className="toast__crossIcon"
        onClick={() => {
          setAlert((old) => ({ ...old, visible: false }));
        }}
      />
      <p>{toast.msg}</p>
    </div>
  );
};

export default Toast;
