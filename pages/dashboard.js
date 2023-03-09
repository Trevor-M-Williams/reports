import { useEffect, useRef, useState } from "react";
import { postReport } from "../firebase";

function Dashboard() {
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const [messageColor, setMessageColor] = useState();
  const numUploaded = useRef(0);

  function handleCSV(data) {
    let rows = data.split("\n");
    rows.map(async (row, i) => {
      if (i === 0) return;
      let url = row.split(",")[0];
      if (url) {
        url = url.replace("http:", "https:").trim();
        let report = await generateReport(url);
        if (report) {
          postReport(report);
          numUploaded.current++;
          console.log(numUploaded.current);
          setMessage(`Uploaded ${numUploaded.current} of ${rows.length}`);
        } else console.log("Error: " + url);
      }
    });
  }

  function handleFileSelect(file) {
    setFile(file);
    setMessage("");
  }

  function handleUpload() {
    if (!file) {
      setMessage("Please select a file");
      setMessageColor("text-red-700");
      return;
    }
    if (file.type !== "text/csv") {
      setMessage("File must be a CSV");
      setMessageColor("text-red-700");
      return;
    }
    setMessage("Uploading...");
    setMessageColor("text-gray-700");
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      handleCSV(result);
    });
    reader.readAsText(file);
  }

  async function generateReport(url) {
    try {
      const res = await fetch("/api/reports?url=" + url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function testAPI() {
    const res = await fetch("/api/reports?url=https://www.google.com");
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="flex">
        <input
          type="file"
          placeholder="Enter a URL"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="h-10 w-[60vw] max-w-lg rounded-l border"
        />
        <button
          onClick={handleUpload}
          className="h-10 bg-blue-200 px-4 rounded-r hover:bg-blue-300"
        >
          Upload
        </button>
      </div>
      <div className={`relative top-4 ${messageColor}`}>{message}</div>
      <button
        onClick={testAPI}
        className="relative top-8 bg-blue-200 px-4 py-1 rounded"
      >
        Test
      </button>
    </div>
  );
}

export default Dashboard;
