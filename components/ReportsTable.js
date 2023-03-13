import { useRef } from "react";
import { postReport } from "../firebase";

const ReportsTable = ({ reports, setCurrentReport }) => {
  const reportBodyRef = useRef();
  const statusColors = ["bg-white", "bg-green-500", "bg-red-500"];

  function handleButtonClick(i) {
    setCurrentReport(reports[i]);
    hideButton(i);
  }

  function handleStatus(i) {
    let newStatus = reports[i].status + 1;
    if (newStatus > 2) newStatus = 0;
    let newReport = { ...reports[i], status: newStatus };
    postReport(newReport);
  }

  function hideButton(i) {
    let sidePanelBtns = document.querySelectorAll(".sidePanelBtn");
    sidePanelBtns[i].classList.add("hidden");
  }

  function showButton(i) {
    let sidePanelBtns = document.querySelectorAll(".sidePanelBtn");
    sidePanelBtns[i].classList.remove("hidden");
  }

  return (
    <div className="mx-auto w-full max-w-5xl grow overflow-auto">
      <table className="text-sm md:text-base lg:text-lg">
        <thead className="sticky top-0 z-10 bg-white">
          <tr>
            <th className="py-1 px-2 md:px-4">ID</th>
            <th className="px-2 py-1 text-left md:px-4">URL</th>
            <th className="px-2 py-1 md:px-4 ">Score</th>
            <th className="px-2 py-1 md:px-4 ">Status</th>
            <div className="absolute inset-x-0 bottom-0 h-px bg-black"></div>
          </tr>
        </thead>
        <tbody ref={reportBodyRef}>
          {reports.map((report, i) => (
            <tr key={i}>
              <td className="w-[5%] border border-l-0 text-center">{i + 1}</td>
              <td
                onMouseEnter={() => {
                  showButton(i);
                }}
                onMouseLeave={() => {
                  hideButton(i);
                }}
                className="relative mx-2 border border-l-0 border-r-0 px-2 py-2 md:px-4"
              >
                <div className="select-none">{report.url}</div>
                <div
                  onClick={() => handleButtonClick(i)}
                  className="sidePanelBtn absolute top-2 bottom-2 right-4 flex hidden cursor-pointer items-center rounded bg-white px-2 text-xs shadow hover:bg-gray-100"
                >
                  <svg
                    viewBox="0 0 16 16"
                    height="14px"
                    width="14px"
                    fill="#999"
                    className="mr-1"
                  >
                    <path d="M2.1416 14.4492H13.8516C15.3281 14.4492 16.0938 13.6904 16.0938 12.2344V3.9082C16.0938 2.45215 15.3281 1.69336 13.8516 1.69336H2.1416C0.665039 1.69336 -0.100586 2.44531 -0.100586 3.9082V12.2344C-0.100586 13.6904 0.665039 14.4492 2.1416 14.4492ZM2.22363 13.1094C1.58789 13.1094 1.23926 12.7812 1.23926 12.1182V4.02441C1.23926 3.36133 1.58789 3.02637 2.22363 3.02637H13.7695C14.3984 3.02637 14.7539 3.36133 14.7539 4.02441V12.1182C14.7539 12.7812 14.3984 13.1094 13.7695 13.1094H2.22363ZM8.51953 12.1113H13.2158C13.5986 12.1113 13.7559 11.9541 13.7559 11.5645V4.57812C13.7559 4.18848 13.5986 4.02441 13.2158 4.02441H8.51953C8.13672 4.02441 7.98633 4.18848 7.98633 4.57812V11.5645C7.98633 11.9541 8.13672 12.1113 8.51953 12.1113Z"></path>
                  </svg>
                  OPEN
                </div>
              </td>
              <td className="border text-center md:w-[10%]">
                {Math.round(report.performance * 100)}
              </td>
              <td className={`border border-r-0 md:w-[10%]`}>
                <div className="flex h-full w-full items-center justify-center">
                  <div
                    onClick={() => handleStatus(i)}
                    className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
                      statusColors[report.status]
                    }`}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
