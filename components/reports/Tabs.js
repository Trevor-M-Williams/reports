import React from "react";

function Tabs({ children }) {
  return (
    <div className="flex w-full max-w-4xl overflow-hidden">{children}</div>
  );
}

export default Tabs;
