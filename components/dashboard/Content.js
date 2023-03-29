import React from "react";

function Content({ children }) {
  return (
    <div className="h-full grow bg-gray-50 pb-12 md:p-10">
      <div className="h-full w-full overflow-hidden rounded bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default Content;
