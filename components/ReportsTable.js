const ReportsTable = ({ reports, setCurrentReport }) => {
  function handleClick(i) {
    const report = {
      ...reports[i],
      id: i,
    };
    setCurrentReport(report);
  }

  const statusColors = [
    "bg-white",
    "bg-blue-400",
    "bg-green-500",
    "bg-red-500",
  ];

  const scoreColors = ["bg-red-400", "bg-yellow-200", "bg-green-400"];

  return (
    <div className="mx-auto flex w-full max-w-7xl overflow-auto px-2">
      <table className="grow text-sm md:text-base lg:text-lg">
        <thead className="">
          <tr>
            <th className="w-[35%] pl-2 text-left md:pl-4">Name</th>
            <th className="w-[35%] pl-2 text-left md:pl-4">Category</th>
            <th className="w-[15%]">Score</th>
            <th className="w-[15%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, i) => {
            let scoreBackground = "";
            if (report.performance) {
              if (report.performance < 0.5) {
                scoreBackground = scoreColors[0];
              } else if (report.performance < 0.8) {
                scoreBackground = scoreColors[1];
              } else {
                scoreBackground = scoreColors[2];
              }
            }
            return (
              <tr
                key={i}
                onClick={() => handleClick(i)}
                className="cursor-pointer hover:bg-blue-50"
              >
                <td className="relative mx-2 border border-l-0 border-r-0 px-2 py-2 md:px-4">
                  <div className="select-none">{report.title}</div>
                </td>
                <td className="border px-2 capitalize md:px-4">
                  {report.category}
                </td>
                <td className={`border text-center md:w-[10%]`}>
                  {report.performance
                    ? Math.round(report.performance * 100)
                    : "-"}
                </td>
                <td className={`border border-r-0 md:w-[10%]`}>
                  <div className="flex h-full w-full items-center justify-center">
                    <div
                      className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
                        statusColors[report.status]
                      }`}
                    ></div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
