import { useState, useContext, useEffect } from "react";
import { ReportsContext } from "../contexts/ReportsContext";
import { deleteReport, postReport } from "../../firebase";

function InfoPanel2() {
  const { reports, currentReport, setCurrentReport, statusColors } =
    useContext(ReportsContext);
  const [editing, setEditing] = useState(false);

  const details = [
    ["name", "title"],
    ["URL", "url"],
    ["category", "category"],
    ["email", "email"],
    ["phone", "phoneNumber"],
    ["rating", "rating"],
    ["reviews", "reviewCount"],
  ];

  const scores = [
    ["P", "performance"],
    ["A", "accessibility"],
    ["BP", "bestPractices"],
    ["SEO", "seo"],
  ];

  useEffect(() => {
    let report = reports[0];
    setCurrentReport(report);
  }, [reports]);

  return (
    <div
      className={`relative flex h-1/2 w-full flex-col bg-white px-4 pt-10 shadow-xl lg:h-full lg:w-2/5 xl:w-[30rem]`}
    >
      {currentReport && (
        <div className="w-full">
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
                currentReport.url ||
                "http://www.google.com/search?q=" + currentReport.title
              }
              target="_blank"
              className="text-[5vw] font-medium lg:text-3xl"
            >
              {currentReport.title}
            </a>
            <div className="mt-2 flex items-center text-2xl">
              <div className="">Status:</div>
              <div
                className={`ml-2 mt-1 h-5 w-5 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
                  statusColors[currentReport.status]
                }`}
              ></div>
            </div>
          </div>

          <div className="mx-auto mt-6 flex w-full flex-col text-xs md:text-base">
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
                    value={currentReport[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                    readOnly={editing ? false : true}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            {scores.map((score, i) => {
              const label = score[0];
              const key = score[1];
              return (
                <div className={`flex border-b capitalize`} key={i}>
                  <div className="ml-2 w-1/4 border-r py-1 font-medium md:ml-4">
                    {label}:
                  </div>
                  <input
                    className={`flex w-full select-none pl-2 focus:outline-0 md:pl-4 ${
                      editing ? "" : "pointer-events-none"
                    }`}
                    value={currentReport[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                    readOnly={editing ? false : true}
                  />
                </div>
              );
            })}
          </div>

          {/* {editing && (
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
          )} */}
        </div>
      )}
    </div>
  );
}

export default InfoPanel2;
