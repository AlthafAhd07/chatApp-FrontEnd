import React from "react";
import "./loader.css";

const Loader = ({ height }) => {
  return (
    <div className="loader" style={{ height: `${height ? height : "100%"}` }}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
