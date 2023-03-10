import React from "react";

function Tabs({ children }) {
  return (
    <div className="flex max-w-4xl overflow-hidden lg:h-[70vh]">{children}</div>
  );
}

export default Tabs;
