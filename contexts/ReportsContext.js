import { useEffect, useState, createContext } from "react";
import { getReports } from "../firebase";

export const ReportsContext = createContext();

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const statusColors = [
    "bg-red-500",
    "bg-white",
    "bg-yellow-200",
    "bg-blue-400",
    "bg-green-500",
  ];

  useEffect(() => {
    getReports(setReports);
  }, []);

  useEffect(() => {
    if (!currentReport) return;
    let report = reports.find((r) => r.title === currentReport.title);
    setCurrentReport(report);
  }, [reports]);

  return (
    <ReportsContext.Provider
      value={{
        reports,
        currentReport,
        setCurrentReport,
        statusColors,
        uploadOpen,
        setUploadOpen,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}
