import { useEffect, useState } from "react";
import Metric from "./Metric";
import SidePanelMenu from "./SidePanelMenu";

function SidePanel({ currentReport, setCurrentReport }) {
  const [sidePanelMenuOpen, setSidePanelMenuOpen] = useState(false);

  useEffect(() => {
    setSidePanelMenuOpen(false);
  }, [currentReport]);

  const statusCodes = [
    "No Report",
    "Generating Report...",
    "Report Generated",
    "Email Sent",
    "Email Error",
  ];
  const details = [
    ["status", "status"],
    ["email", "email"],
    ["phoneNumber", "phone"],
    ["rating", "rating"],
    ["reviewCount", "reviews"],
  ];

  let transform = "translate-x-full";
  if (currentReport) {
    transform = "translate-x-0";
  }

  function handleSidePanelMenu() {
    setSidePanelMenuOpen(!sidePanelMenuOpen);
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 z-20 flex w-full flex-col items-center bg-white px-4 py-12 shadow-xl transition-transform duration-500 ease-in-out lg:w-1/2 lg:max-w-2xl ${transform}`}
    >
      {currentReport && (
        <div className="w-full">
          <button
            onClick={() => setCurrentReport(false)}
            className="absolute top-3 left-3 h-6 w-6"
          >
            <svg width="100%" viewBox="0 0 1024 1024" fill="#999">
              <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
            </svg>
          </button>

          <button
            onClick={handleSidePanelMenu}
            className="absolute top-3 right-3 h-6 w-6"
          >
            <svg width="100%" viewBox="0 0 32.055 32.055" fill="#999">
              <g>
                <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
              </g>
            </svg>
          </button>

          {sidePanelMenuOpen && (
            <SidePanelMenu
              currentReport={currentReport}
              setCurrentReport={setCurrentReport}
              setSidePanelMenuOpen={setSidePanelMenuOpen}
            />
          )}

          <div className="flex flex-col items-center">
            <div className="text-[5vw] font-medium md:text-3xl">
              {currentReport.title}
            </div>

            {currentReport.url ? (
              <a
                href={currentReport.url}
                target="_blank"
                className="mt-2 text-[4vw] font-medium text-blue-700 md:text-2xl"
              >
                {currentReport.url}
              </a>
            ) : (
              <div className="mt-2 text-[4vw] font-medium md:text-2xl">
                No URL
              </div>
            )}
          </div>

          {currentReport.performance && (
            <div className="flex flex-col items-center">
              <div className="mt-8 flex w-full justify-between">
                <Metric
                  category="Performance"
                  value={Math.round(currentReport.performance * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="Accessibility"
                  value={Math.round(currentReport.accessibility * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="Best Practices"
                  value={Math.round(currentReport.bestPractices * 100)}
                  sidePanel={true}
                />
                <Metric
                  category="SEO"
                  value={Math.round(currentReport.seo * 100)}
                  sidePanel={true}
                />
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 flex w-full flex-col text-sm sm:text-base md:text-xl">
            {details.map((detail, i) => {
              const key = detail[0];
              const label = detail[1];
              return (
                <div className="flex border-b capitalize" key={i}>
                  <div className="ml-2 w-1/4 border-r py-1 font-medium md:ml-4">
                    {label}:
                  </div>
                  <div className="ml-2 md:ml-4">
                    {key === "status"
                      ? statusCodes[currentReport.status]
                      : currentReport[key] || ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SidePanel;
