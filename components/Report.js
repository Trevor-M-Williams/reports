import { useState } from "react";

import Tab from "./Tab";
import TabBar from "./TabBar";
import Metrics from "./Metrics";
import Opportunities from "./Opportunities";

function Report() {
  const [tab, setTab] = useState(0);

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <TabBar tab={tab} setTab={setTab} />
      <Tab tab={tab}>
        <Metrics />
      </Tab>
      <Tab tab={tab}>
        <Opportunities />
      </Tab>
    </div>
  );
}

export default Report;
