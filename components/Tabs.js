import React from "react";

function Tabs({ children }) {
  return (
    <div className="flex lg:h-[70vh] max-w-4xl overflow-hidden">{children}</div>
  );
}

export default Tabs;
