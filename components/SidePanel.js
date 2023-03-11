function SidePanel({ currentReport, setCurrentReport }) {
  let transform = "translate-x-full";
  if (currentReport) {
    transform = "translate-x-0";
  }

  return (
    <div
      className={`fixed inset-y-0 right-0 z-20 w-1/2 max-w-xl bg-white px-6 py-12 shadow-xl transition-transform duration-500 ease-in-out ${transform}`}
    >
      {currentReport && (
        <>
          <button
            onClick={() => setCurrentReport(false)}
            className="absolute top-2 left-2 h-6 w-6"
          >
            <svg width="100%" viewBox="0 0 1024 1024" fill="#999">
              <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
            </svg>
          </button>
          <div className="p-4 text-xl font-medium">{currentReport.url}</div>
          <div className="">
            <div className="flex p-4">
              <div className="mr-2 font-medium">Performance:</div>
              <div>{Math.round(currentReport.performance * 100)}</div>
            </div>
            <div className="flex p-4">
              <div className="mr-2 font-medium">Accessibility:</div>
              <div>{Math.round(currentReport.accessibility * 100)}</div>
            </div>
            <div className="flex p-4">
              <div className="mr-2 font-medium">Best Practices:</div>
              <div>{Math.round(currentReport.bestPractices * 100)}</div>
            </div>
            <div className="flex p-4">
              <div className="mr-2 font-medium">SEO:</div>
              <div>{Math.round(currentReport.seo * 100)}</div>
            </div>

            <div className="max-h-[50vh] w-full overflow-auto border">
              {currentReport.opportunities.map((opprtunity, i) => (
                <div key={i} className="flex flex-col p-4">
                  <div className="mr-2 font-medium">{opprtunity.title}</div>
                  <div>{opprtunity.description}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SidePanel;
