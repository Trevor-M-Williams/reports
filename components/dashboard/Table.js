import { useContext, useState } from "react";
import { ReportsContext } from "../../contexts/ReportsContext";
import { deleteReport, postReport } from "../../firebase";
import { generateReport } from "./FileInput";
import { DataGrid } from "@mui/x-data-grid";
import {
  MdMailOutline,
  MdDeleteOutline,
  MdPendingActions,
  MdUploadFile,
} from "react-icons/md";

function CustomToolbar({ reports, selectionModel, setSelectionModel }) {
  const { setUploadOpen } = useContext(ReportsContext);
  function handleEmail() {
    selectionModel.forEach((index) => {
      let report = reports.find((r) => r.title === index);
      report.status = 4;
      postReport(report);
    });
    setSelectionModel([]);
  }

  function handleReportGeneration() {
    selectionModel.forEach((index) => {
      let report = reports.find((r) => r.title === index);
      report.status = 2;
      postReport(report);
      generateReport(report);
    });
    setSelectionModel([]);
  }

  function handleDelete() {
    selectionModel.forEach((index) => {
      let report = reports.find((r) => r.title === index);
      deleteReport(report);
    });
    setSelectionModel([]);
  }

  function postTestReport() {
    let report = {
      title: "0 - Test Report",
      url: "https://www.google.com",
      category: "Test",
      email: "test",
      status: 1,
    };
    postReport(report);
  }

  return (
    <div className="flex h-12 w-full items-center justify-between border-b px-4 text-xl text-sky-500">
      <div className="flex">
        <div className="text-gray-700">Reports</div>
        {selectionModel.length > 0 && (
          <div className="ml-4 flex items-center gap-2 ">
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-[0.15rem] shadow-none hover:shadow-[0_0_2px_2px_#aaf]">
              <MdMailOutline onClick={handleEmail} />
            </div>
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-[0.15rem] shadow-none hover:shadow-[0_0_2px_2px_#aaf]">
              <MdPendingActions onClick={handleReportGeneration} />
            </div>
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-[0.15rem] shadow-none hover:shadow-[0_0_2px_2px_#aaf]">
              <MdDeleteOutline onClick={handleDelete} />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={postTestReport}
          className="mr-4 rounded border border-white bg-sky-600 px-3 text-sm text-white hover:border-sky-600 hover:bg-white hover:text-sky-600"
        >
          Test
        </button>
        <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-[0.15rem] shadow-none hover:shadow-[0_0_2px_2px_#aaf]">
          <MdUploadFile onClick={() => setUploadOpen(true)} className="" />
        </div>
      </div>
    </div>
  );
}

export default function Table() {
  const { reports, currentReport, setCurrentReport, statusColors } =
    useContext(ReportsContext);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = [
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <div className="text-base">{params.value}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <div className="text-base">{params.value}</div>,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      maxWidth: 100,
      renderCell: (params) => (
        <div className="text-base capitalize">{params.value}</div>
      ),
    },
    {
      field: "performance",
      headerName: "Score",
      type: "number",
      flex: 1,
      maxWidth: 150,
      renderCell: (params) => {
        let value = Math.round(params.value * 100) || "-";
        return <div className="text-base">{value}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      flex: 1,
      maxWidth: 150,
      renderCell: (params) => {
        return (
          <div
            className={`h-4 w-4 rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
              statusColors[params.value]
            }`}
          ></div>
        );
      },
    },
  ];

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const openInfoPanel = (params) => {
    if (currentReport) {
      const oldID = currentReport.title;
      const oldRow = document.querySelector(`[data-id="${oldID}"]`);
      if (oldRow) oldRow.classList.remove("shadow-[inset_5px_0_0_0_#aaf]");
    }
    const newID = params.id;
    const newRow = document.querySelector(`[data-id="${newID}"]`);
    newRow.classList.add("shadow-[inset_5px_0_0_0_#aaf]");
    setCurrentReport(params.row);
  };

  return (
    <div
      className={`mx-auto h-full w-full max-w-7xl select-none rounded bg-white px-4 shadow-lg md:rounded-lg`}
    >
      <DataGrid
        getRowId={(row) => row.title}
        rows={reports}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableVirtualization
        onRowClick={(params) => openInfoPanel(params)}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionModelChange}
        components={{
          Toolbar: () => (
            <CustomToolbar
              reports={reports}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
            />
          ),
        }}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
}
