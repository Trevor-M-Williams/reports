import { ReportsProvider } from "../components/contexts/ReportsContext";
import Menu from "../components/dashboard/Menu";
import Content from "../components/dashboard/Content";
import Table from "../components/dashboard/Table";

function test() {
  return (
    <div className="absolute inset-0 flex">
      <Menu />
      <Content>
        <ReportsProvider>
          <Table />
        </ReportsProvider>
      </Content>
    </div>
  );
}

export default test;
