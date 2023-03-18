import { useEffect, useState } from "react";
import { getReports } from "../firebase";
import DashboardNav from "../components/DashboardNav";
import ReportsTable from "../components/ReportsTable";
import FileInput from "../components/FileInput";
import SidePanel from "../components/SidePanel";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    getReports(setReports);
  }, []);

  useEffect(() => {
    if (!currentReport) return;
    setCurrentReport({
      index: currentReport.index,
      report: reports[currentReport.index],
    });
  }, [reports]);

  return (
    <div className="absolute inset-0 flex flex-col px-2 py-4 md:p-6">
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
            reports={reports}
            setReports={setReports}
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
