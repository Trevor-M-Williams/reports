import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import ReportsTable from "../components/ReportsTable";
import FileInput from "../components/FileInput";
import SidePanel from "../components/SidePanel";

const Test = () => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  return (
    <div className="absolute inset-0 px-6">
      <DashboardNav setUploadOpen={setUploadOpen} />
      <FileInput
        reports={reports}
        setReports={setReports}
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
      />
      {reports.length > 0 && (
        <>
          <ReportsTable reports={reports} setCurrentReport={setCurrentReport} />
          <SidePanel
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
          />
        </>
      )}
    </div>
  );
};

export default Test;
