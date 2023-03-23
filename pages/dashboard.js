import { useEffect, useState } from "react";
import { getReports } from "../firebase";
import DashboardNav from "../components/DashboardNav";
import ReportsFilter from "../components/ReportsFilter";
import ReportsTable from "../components/ReportsTable";
import FileInput from "../components/FileInput";
import SidePanel from "../components/SidePanel";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [checked, setChecked] = useState(Array(reports.length).fill(false));
  const [allChecked, setAllChecked] = useState(false);
  const [reportsMenuVisible, setReportsMenuVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);

  const statusColors = [
    "bg-red-500",
    "bg-white",
    "bg-yellow-300",
    "bg-blue-400",
    "bg-green-500",
  ];

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
    <div className="inset-0 mx-auto flex h-screen w-full max-w-7xl flex-col px-2 py-4 md:p-6">
      <DashboardNav
        reports={reports}
        reportsMenuVisible={reportsMenuVisible}
        setUploadOpen={setUploadOpen}
        checked={checked}
        setChecked={setChecked}
        setAllChecked={setAllChecked}
      />
      <FileInput
        reports={reports}
        setReports={setReports}
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
      />
      {reports.length > 0 && (
        <>
          <ReportsFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ReportsTable
            reports={reports}
            setReports={setReports}
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
            checked={checked}
            setChecked={setChecked}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
            setReportsMenuVisible={setReportsMenuVisible}
            statusColors={statusColors}
            statusFilter={statusFilter}
          />
          <SidePanel
            reports={reports}
            setReports={setReports}
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
            statusColors={statusColors}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
