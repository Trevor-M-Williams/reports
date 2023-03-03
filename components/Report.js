import { useState } from "react";
import Tab from "./Tab";
import TabBar from "./TabBar";

function Report() {
  const [tab, setTab] = useState(0);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <TabBar tab={tab} setTab={setTab} />
      <Tab tab={tab}>
        <div className="h-full w-full max-w-6xl mx-auto py-14 border border-black flex flex-wrap">
          <div className="w-1/2 h-1/2 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full"></div>
          </div>
        </div>
      </Tab>
      <Tab tab={tab} bg="bg-gray-200" />
    </div>
  );
}

export default Report;
