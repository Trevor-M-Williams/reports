import { useState } from "react";
import { postReport } from "../firebase";
import Metric from "./Metric";

function SidePanel({ reports, currentReport, setCurrentReport }) {
  const [editing, setEditing] = useState(false);

  let transform = "translate-x-full";
  if (currentReport) {
    transform = "translate-x-0";
  }
  const details = [
    ["name", "title"],
    ["url", "url"],
    ["category", "category"],
    ["email", "email"],
    ["phone", "phoneNumber"],
    ["rating", "rating"],
    ["reviews", "reviewCount"],
  ];
  const statusColors = [
    "bg-red-500",
    "bg-white",
    "bg-yellow-300",
    "bg-blue-400",
    "bg-green-500",
  ];

  function closeSidePanel() {
    setEditing(false);
    setCurrentReport(false);
  }

  function handleInputChange(e, key) {
    let report = {
      ...currentReport.report,
      [key]: e.target.value,
    };
    setCurrentReport({
      index: currentReport.index,
      report,
    });
  }

  function handleSave() {
    postReport(currentReport.report);
    setEditing(false);
  }

  function handleCancel() {
    let report = reports[currentReport.index];
    setCurrentReport({
      index: currentReport.index,
      report,
    });
    setEditing(false);
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 z-20 flex w-full flex-col bg-white px-4 pt-20 shadow-xl transition-transform duration-500 ease-in-out lg:w-1/2 lg:max-w-2xl ${transform}`}
    >
      {currentReport && (
        <div className="w-full">
          <button
            onClick={closeSidePanel}
            className="absolute top-3 left-3 h-6 w-6"
          >
            <svg width="100%" viewBox="0 0 1024 1024" fill="#999">
              <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
            </svg>
          </button>

          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 h-6 w-6"
          >
            <svg width="100%" viewBox="0 0 32.055 32.055" fill="#999">
              <g>
                <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
              </g>
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <a
              href={
                currentReport.report.url ||
                "http://www.google.com/search?q=" + currentReport.report.title
              }
              target="_blank"
              className="text-[5vw] font-medium lg:text-3xl"
            >
              {currentReport.report.title}
            </a>
            <div className="mt-4 flex items-center text-2xl">
              <div className="">Status:</div>
              <div
                className={`ml-2 mt-1 h-5 w-5 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
                  statusColors[currentReport.report.status]
                }`}
              ></div>
            </div>
          </div>

          {currentReport.report.performance && (
            <div className="flex flex-col items-center">
              <div className="mt-10 flex w-full justify-between">
                <Metric
                  category="Performance"
                  value={Math.round(currentReport.report.performance * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="Accessibility"
                  value={Math.round(currentReport.report.accessibility * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="Best Practices"
                  value={Math.round(currentReport.report.bestPractices * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="SEO"
                  value={Math.round(currentReport.report.seo * 100)}
                  sidePanel={true}
                />
              </div>
            </div>
          )}

          <div className="mx-auto mt-10 flex w-full flex-col text-xs sm:text-xl lg:text-lg xl:text-xl">
            {details.map((detail, i) => {
              const label = detail[0];
              const key = detail[1];
              let textTransform = "";
              if (key === "email") textTransform = "normal-case";
              return (
                <div className={`flex border-b capitalize`} key={i}>
                  <div className="ml-2 w-1/4 border-r py-1 font-medium md:ml-4">
                    {label}:
                  </div>
                  <input
                    className={`flex w-full select-none pl-2 focus:outline-0 md:pl-4 ${textTransform} ${
                      editing ? "" : "pointer-events-none"
                    }`}
                    value={currentReport.report[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                    readOnly={editing ? false : true}
                  />
                </div>
              );
            })}
          </div>

          {editing && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSave}
                className="w-20 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="ml-4 w-20 rounded-md bg-gray-500 py-2 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SidePanel;
