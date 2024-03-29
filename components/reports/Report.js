import { useState } from "react";
import Nav from "./Nav";
import Tabs from "./Tabs";
import Tab from "./Tab";
import TabBar from "./TabBar";
import Title from "./Title";
import Metrics from "./Metrics";
import Suggestions from "./Suggestions";

function Report({ data }) {
  const [tab, setTab] = useState(0);

  return (
    <div className="absolute inset-0 flex flex-col items-center overflow-hidden px-2 pt-[2vh] pb-2">
      <Nav />
      <Title url={data.url} />
      <TabBar tab={tab} setTab={setTab} />
      <Tabs>
        <Tab tab={tab}>
          <Metrics data={data} />
        </Tab>
        <Tab tab={tab}>
          <Suggestions data={data} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Report;
