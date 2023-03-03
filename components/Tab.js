import React from "react";

function Tab({ children, tab, bg }) {
  let transition = "translate-x-0";
  if (tab === 1) transition = "-translate-x-full";
  return (
    <div
      className={`h-full w-full transition-transform duration-500 shrink-0 ${transition} ${bg}`}
    >
      {children}
    </div>
  );
}

export default Tab;
