import React from "react";

function Content({ children }) {
  return (
    <div className="mx-auto h-full w-full bg-gray-50 p-10">{children}</div>
  );
}

export default Content;
