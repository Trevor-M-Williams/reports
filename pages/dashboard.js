import { ReportsProvider } from "../contexts/ReportsContext";
import Menu from "../components/dashboard/Menu";
import Content from "../components/dashboard/Content";
import Table from "../components/dashboard/Table";
import InfoPanel from "../components/dashboard/InfoPanel";
import FileInput from "../components/dashboard/FileInput";

function dashboard() {
  return (
    <div className="absolute inset-0 flex overflow-hidden">
      <Menu />
      <Content>
        <ReportsProvider>
          <div className="flex h-full w-full flex-col lg:flex-row">
            <Table />
            <InfoPanel />
            <FileInput />
          </div>
        </ReportsProvider>
      </Content>
    </div>
  );
}

export default dashboard;
