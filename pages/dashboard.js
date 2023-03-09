import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import FileInput from "../components/FileInput";
import { H1, H2, H3, P } from "../components/Typography";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const statusColors = ["bg-gray-200", "bg-green-500", "bg-yellow-300"];

  useEffect(() => {
    const db = getDatabase();
    const reportsRef = ref(db, "reports/");

    onValue(
      reportsRef,
      (snapshot) => {
        const reportsData = snapshot.val();
        if (reportsData) {
          const reportsList = Object.values(reportsData);
          setReports(reportsList);
        }
      },
      (error) => {
        console.log("The read failed: " + error.name);
      }
    );
  }, []);

  useEffect(() => {
    console.log(reports[0]);
  }, [reports]);

  function changeStatus(i) {
    const db = getDatabase();
    const reportsRef = ref(db, `reports/${reports[i].id}`);
    const newStatus = reports[i].status === 2 ? 0 : reports[i].status + 1;
    reportsRef.update({ status: newStatus });
  }

  return (
    <div className="max-w-3xl mx-auto p-2">
      {reports.length === 0 && <FileInput />}
      {reports.length > 0 && (
        <div>
          <H1 text="Reports" />
          {reports.map((report, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded p-2 my-1"
            >
              <div>{report.url}</div>
              <div
                onClick={() => changeStatus(i)}
                className={`h-5 w-5 shrink-0 border- border-white outline outline-1 outline-gray-500 rounded-full  ${
                  statusColors[parseInt(report.status)]
                }`}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
