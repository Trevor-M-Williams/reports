import { generateReport } from "./FileInput";

function SidePanelMenu({
  currentReport,
  setCurrentReport,
  setSidePanelMenuOpen,
}) {
  function handleReport() {
    let report = {
      ...currentReport,
      status: 1,
    };
    setCurrentReport(report);
    generateReport(report);
    setSidePanelMenuOpen(false);
  }
  return (
    <div className="absolute top-8 right-3 z-10 rounded border bg-white p-4 text-xl shadow-lg">
      <div onClick={handleReport} className="cursor-pointer border-b py-1">
        Generate Report
      </div>
      <div className="border-b py-1">Send Email</div>
      <div className="py-1">Edit Info</div>
    </div>
  );
}

export default SidePanelMenu;
