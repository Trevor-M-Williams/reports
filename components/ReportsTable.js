import { useState, useEffect } from "react";

function ReportsTable({
  reports,
  currentReport,
  setCurrentReport,
  checked,
  setChecked,
  allChecked,
  setAllChecked,
  setReportsMenuVisible,
  statusColors,
  statusFilter,
}) {
  const [shiftClicked, setShiftClicked] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Shift") setShiftClicked(true);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "Shift") setShiftClicked(false);
    });
  }, []);

  useEffect(() => {
    setChecked(Array(reports.length).fill(false));
  }, [reports]);

  useEffect(() => {
    if (checked.includes(true)) setReportsMenuVisible(true);
    else setReportsMenuVisible(false);
  }, [checked]);

  function handleReportClick(i) {
    setCurrentReport({
      index: i,
      report: reports[i],
    });
  }

  function handleCheckboxes(index) {
    if (index === "all") {
      let newChecked = reports.map((report) => {
        if (statusFilter !== "all" && statusFilter !== report.status)
          return false;
        return !allChecked;
      });
      setChecked(newChecked);
      setAllChecked(!allChecked);
    } else {
      let newChecked = [...checked];
      newChecked[index] = !newChecked[index];
      if (shiftClicked) {
        let start = 0;
        for (let i = 1; i < index; i++) {
          if (newChecked[i]) {
            if (statusFilter !== "all" && statusFilter !== reports[i].status)
              continue;
            start = i;
          }
        }
        for (let i = start; i < index; i++) {
          newChecked[i] = true;
        }
      }
      setChecked(newChecked);
    }
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl overflow-auto px-2">
      <table className="grow select-none text-xs md:text-base lg:text-lg">
        <thead className="">
          <tr className="">
            <th className="w-[5%] py-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() => handleCheckboxes("all")}
              />
            </th>
            <th className="w-[45%] pl-2 text-left md:pl-4">Name</th>
            <th className="w-[30%] pl-2 text-left md:pl-4">Category</th>
            <th className="w-[10%]">Score</th>
            <th className="w-[10%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((report, i) => {
              let hidden = "";
              if (statusFilter !== "all" && statusFilter !== report.status)
                hidden = "hidden";
              return (
                <tr
                  key={i}
                  className={`cursor-pointer ${
                    i === currentReport.index ? "bg-blue-50" : ""
                  } ${hidden}`}
                >
                  <td className="cursor-default border border-l-0 px-2 text-center capitalize md:px-4">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => handleCheckboxes(i)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td
                    onClick={() => handleReportClick(i)}
                    className="relative mx-2 border border-r-0 px-2 py-2 md:px-4"
                  >
                    <div className=" capitalize">{report.title}</div>
                  </td>
                  <td
                    onClick={() => handleReportClick(i)}
                    className="relative mx-2 border border-r-0 px-2 py-2 md:px-4"
                  >
                    <div className=" capitalize">{report.category}</div>
                  </td>
                  <td
                    onClick={() => handleReportClick(i)}
                    className={`border text-center md:w-[10%]`}
                  >
                    {report.performance
                      ? Math.round(report.performance * 100)
                      : "-"}
                  </td>
                  <td
                    onClick={() => handleReportClick(i)}
                    className={`border border-r-0 md:w-[10%]`}
                  >
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
}

export default ReportsTable;
