import React from "react";

function TabBar({ tab, setTab }) {
  const bg = "bg-blue-100";

  return (
    <div className="absolute z-10 top-5 left-1/2 -translate-x-1/2 w-1/2 max-w-xl border-2 border-blue-100 rounded-full flex overflow-hidden">
      <div
        onClick={() => setTab(0)}
        className={`w-1/2 py-1 flex items-center justify-center border-r cursor-pointer ${
          tab === 0 ? bg : "bg-transparent"
        }`}
      >
        Metrics
      </div>
      <div
        onClick={() => setTab(1)}
        className={`w-1/2 py-1 flex items-center justify-center cursor-pointer ${
          tab === 1 ? bg : "bg-transparent"
        }`}
      >
        Opportunities
      </div>
    </div>
  );
}

export default TabBar;
