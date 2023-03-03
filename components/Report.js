import { useState } from "react";
import Nav from "./Nav";
import Tab from "./Tab";
import TabBar from "./TabBar";
import Metrics from "./Metrics";
import Opportunities from "./Opportunities";

function Report() {
  const [tab, setTab] = useState(0);

  return (
    <div className="absolute inset-0 pt-[22vh] pb-[10vh] flex overflow-hidden">
      <Nav />
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
