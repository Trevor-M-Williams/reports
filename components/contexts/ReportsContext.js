import { useEffect, useState, createContext } from "react";
import { getReports } from "../../firebase";

export const ReportsContext = createContext();

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports(setReports);
  }, []);

  return (
    <ReportsContext.Provider value={reports}>
      {children}
    </ReportsContext.Provider>
  );
}
