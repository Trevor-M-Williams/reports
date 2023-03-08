import { useEffect, useRef, useState } from "react";
import { postReport } from "../firebase";

function Dashboard() {
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const [messageColor, setMessageColor] = useState();
  const numUploaded = useRef(0);

  useEffect(() => {
    console.log(numUploaded.current);
  });

  function generateReport(data) {
    if (!data) return;
    if (!data.lighthouseResult) return;
    if (!data.lighthouseResult.audits) return;

    let opportunities = [];
    let keys = Object.keys(data.lighthouseResult.audits);

    keys.forEach((key) => {
      let item = data.lighthouseResult.audits[key];
      let title = item.title;
      let description = item.description.split("[Learn more]")[0].trim();
      let savings = item.numericValue;
      let score = item.score;
      let details = item.details;
      if (savings && details && details.type === "opportunity" && score < 0.9) {
        opportunities.push({ title, description, savings });
      }
    });

    opportunities.sort((a, b) => b.savings - a.savings);

    let report = {
      url: data.lighthouseResult.finalUrl,
      performance: data.lighthouseResult.categories.performance.score,
      accessibility: data.lighthouseResult.categories.accessibility.score,
      bestPractices: data.lighthouseResult.categories["best-practices"].score,
      seo: data.lighthouseResult.categories.seo.score,
      opportunities,
    };

    return report;
  }

  function handleCSV(data) {
    let rows = data.split("\n");
    rows.map(async (row, i) => {
      if (i === 0) return;
      if (i > 10) return;
      let url = row.split(",")[0];
      if (url) {
        url = url.replace("http:", "https:").trim();
        let data = await runPageSpeedTest(url);
        let report = generateReport(data);
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

  async function runPageSpeedTest(url) {
    try {
      const res = await fetch("/api/reports?url=" + url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: " + url);
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
