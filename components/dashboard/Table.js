import { useContext, useState } from "react";
import { ReportsContext } from "../contexts/ReportsContext";
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
      title: "0",
      category: "test",
      status: 1,
      email: "test@email.com",
      url: "https://www.google.com",
    };
    postReport(report);
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
      minWidth: 200,
      renderCell: (params) => {
        let highlight = currentReport?.title === params.value;
        return (
          <div
            onClick={() => openSidePanel(params)}
            className={`flex h-full w-full items-center justify-between pl-2 text-base ${
              highlight && "bg-sky-200"
            }`}
          >
            <div>{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      renderCell: (params) => (
        <div className="text-base capitalize">{params.value}</div>
      ),
    },
    {
      field: "performance",
      headerName: "Score",
      type: "number",
      width: 90,
      renderCell: (params) => {
        let value = Math.round(params.value * 100) || "-";
        return <div className="text-base">{value}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 90,
      renderCell: (params) => {
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

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const openSidePanel = (params) => {
    console.log(params.row.title);
    setCurrentReport(params.row);
  };

  return (
    <div className={`h-1/2 grow rounded-lg border-0 px-4 lg:h-full`}>
      <DataGrid
        getRowId={(row) => row.title}
        rows={reports}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
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
