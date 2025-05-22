import React from "react";
import Topbar from "./Topbar";

const index = ({ children }) => {
  return (
    <div>
      <Topbar />
      <div className="children-component">{children}</div>
    </div>
  );
};

export default index;
