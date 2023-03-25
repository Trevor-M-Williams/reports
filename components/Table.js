import { useState } from "react";
import { deleteReport, postReport } from "../firebase";
import { generateReport } from "./FileInput";
import { DataGrid } from "@mui/x-data-grid";
import {
  MdMailOutline,
  MdDeleteOutline,
  MdPendingActions,
  MdUploadFile,
} from "react-icons/md";

const columns = [
  {
    field: "title",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => <div className="text-base">{params.value}</div>,
  },
  {
    field: "category",
    headerName: "Category",
    width: 120,

    renderCell: (params) => (
      <div className="text-base capitalize">{params.value}</div>
    ),
  },
  {
    field: "performance",
    headerName: "Score",
    type: "number",
    width: 120,

    renderCell: (params) => {
      let value = Math.round(params.value * 100) || "-";
      return <div className="text-base">{value}</div>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    width: 120,

    renderCell: (params) => {
      const statusColors = [
        "bg-red-500",
        "bg-white",
        "bg-yellow-300",
        "bg-blue-400",
        "bg-green-500",
      ];
      return (
        <div
          className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white outline outline-1 outline-gray-700 ${
            statusColors[params.value]
          }`}
        ></div>
      );
    },
  },
];

function CustomToolbar({ reports, selectionModel, setSelectionModel }) {
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
  return (
    <div className="flex h-12 w-full items-center justify-between border-b px-4 text-xl text-sky-600">
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

      <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-[0.15rem] shadow-none hover:shadow-[0_0_2px_2px_#aaf]">
        <MdUploadFile className="" />
      </div>
    </div>
  );
}

export default function DataTable({ reports }) {
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  return (
    <div className="mx-auto h-full w-full max-w-6xl rounded-lg border-0 bg-white px-4 shadow-lg">
      <DataGrid
        getRowId={(row) => row.title}
        rows={reports}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionModelChange}
        showColumnsButton={false}
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
