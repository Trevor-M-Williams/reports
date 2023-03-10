import { useEffect, useState } from "react";
import FileInput from "../components/FileInput";
import SidePanel from "../components/SidePanel";
import DashboardNav from "../components/DashboardNav";

const Test = () => {
  const [reports, setReports] = useState([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  return (
    <div className="absolute inset-0">
      <DashboardNav setUploadOpen={setUploadOpen} />
      <FileInput
        reports={reports}
        setReports={setReports}
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
      />
      {reports.map((report, i) => (
        <div key={i}>
          <h1>{report.url}</h1>
        </div>
      ))}
    </div>
  );
};

export default Test;
