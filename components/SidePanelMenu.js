import { postReport } from "../firebase";
import { generateReport } from "./FileInput";

function SidePanelMenu({ currentReport, setSidePanelMenuOpen, setEditing }) {
  function sendEmail() {
    postReport({
      ...currentReport.report,
      status: 4,
    });
  }

  function handleReport() {
    const newReport = {
      ...currentReport.report,
      status: 2,
    };
    postReport(newReport);
    generateReport(newReport);
    setSidePanelMenuOpen(false);
  }

  function handleEdit() {
    setEditing(true);
    setSidePanelMenuOpen(false);
  }

  return (
    <div className="absolute top-8 right-3 z-10 rounded border bg-white text-xl shadow-lg">
      <div
        onClick={handleReport}
        className="cursor-pointer border-b p-4 py-1 hover:bg-blue-50"
      >
        Generate Report
      </div>
      <div
        onClick={sendEmail}
        className="cursor-pointer border-b p-4 py-1 hover:bg-blue-50"
      >
        Send Email
      </div>
      <div
        onClick={handleEdit}
        className="cursor-pointer p-4 py-1 hover:bg-blue-50"
      >
        Edit Report
      </div>
    </div>
  );
}

export default SidePanelMenu;
