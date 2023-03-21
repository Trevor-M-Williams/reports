import { FiUpload } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";

import { postReport, deleteReport } from "../firebase";
import { generateReport } from "./FileInput";

function DashboardNav({
  reports,
  setUploadOpen,
  reportsMenuVisible,
  checked,
  setChecked,
}) {
  function handleEmail() {
    checked.forEach((isChecked, i) => {
      if (!isChecked) return;
      postReport({
        ...reports[i],
        status: 4,
      });
    });
    setChecked(Array(reports.length).fill(false));
  }

  function handleReportGeneration() {
    checked.forEach((isChecked, i) => {
      if (!isChecked) return;
      const newReport = {
        ...reports[i],
        status: 2,
      };
      postReport(newReport);
      generateReport(newReport);
    });
    setChecked(Array(reports.length).fill(false));
  }

  function handleDelete() {
    const reportsCopy = [...reports];

    checked.forEach((isChecked, i) => {
      if (!isChecked) return;
      deleteReport(reportsCopy[i]);
    });

    setChecked(Array(reports.length).fill(false));
  }

  return (
    <div className="mx-auto mb-5 flex h-10 w-full items-center justify-end text-2xl text-sky-600">
      {reportsMenuVisible ? (
        <>
          <AiOutlineMail
            onClick={handleEmail}
            className="ml-2 cursor-pointer hover:text-sky-800"
          />
          <TbReportAnalytics
            onClick={handleReportGeneration}
            className="ml-2 cursor-pointer hover:text-sky-800"
          />
          <RiDeleteBinLine
            onClick={handleDelete}
            className="ml-2 cursor-pointer text-[1.45rem] hover:text-sky-800"
          />
        </>
      ) : (
        <FiUpload
          onClick={() => setUploadOpen(true)}
          className="cursor-pointer hover:text-sky-800"
        />
      )}
    </div>
  );
}

export default DashboardNav;
