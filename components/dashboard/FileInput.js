import { useState, useContext } from "react";
import { ReportsContext } from "../../contexts/ReportsContext";
import { postReport } from "../../firebase";
import Papa from "papaparse";

function FileInput() {
  const { uploadOpen, setUploadOpen } = useContext(ReportsContext);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState();
  const [messageColor, setMessageColor] = useState("text-gray-700");
  const opacity = uploadOpen ? "opacity-100" : "opacity-0 pointer-events-none";

  function handleData(data, category) {
    data.forEach((item, i) => {
      // if (i > 4) return;
      if (!item.url && !item.website) return;
      if (item.website) {
        item.url = item.website;
        delete item.website;
      }
      item.url =
        item.url.split("/")[0] +
        item.url.split("/")[1] +
        "//" +
        item.url.split("/")[2];
      if (item.title) item.title = item.title.replace(/[.$#\[\]\/]/g, "");
      else
        item.title = item.url
          .replace("http://", "")
          .replace("https://", "")
          .replace("www.", "")
          .split(".")[0];
      item.category = category;
      postReport({
        ...item,
        status: 2,
      });
      generateReport(item);
    });
  }

  function handleUpload(file) {
    if (file.type !== "text/csv" && file.type !== "application/json") {
      setMessage("File must be JSON or CSV");
      setMessageColor("text-red-700");
      return;
    }

    const category = file.name.split(".")[0];
    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          handleData(results.data, category);
        },
      });
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const result = event.target.result;
        const data = JSON.parse(result);
        handleData(data, category);
      });
      reader.readAsText(file);
    }

    setUploadOpen(false);
    document.querySelector("input[type=file]").value = "";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleUpload(e.dataTransfer.files[0]);
  }

  function handleFileInputChange(e) {
    handleUpload(e.target.files[0]);
  }

  function handleFileSelect() {
    document.querySelector("input[type=file]").click();
  }

  return (
    <div
      className={`transition-color absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 duration-500 ${opacity}`}
    >
      <div className="relative flex h-[50vh] w-full max-w-md items-center justify-center rounded-lg bg-white p-10">
        <button
          onClick={() => setUploadOpen(false)}
          className="absolute top-2 left-2 h-6 w-6"
        >
          <svg width="100%" viewBox="0 0 1024 1024" fill="#999">
            <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
          </svg>
        </button>
        <div
          className={`relative flex h-full w-full items-center justify-center rounded-md border-2 border-dashed text-center ${
            dragging ? "border-blue-500" : "border-gray-400"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragEnter}
          onDrop={handleDrop}
        >
          <div className="w-full">
            <p className="text-2xl text-gray-400">Drag and drop file here</p>
            <input
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <div>
              <button
                className="my-6 w-32 rounded bg-blue-500 py-2 font-medium text-white hover:bg-blue-700"
                onClick={handleFileSelect}
              >
                Select File
              </button>
              <p className={`absolute w-full ${messageColor}`}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileInput;

export async function generateReport(data) {
  const url = data.url || data.website;
  if (!url) {
    postReport({
      ...data,
      status: 1,
    });
    return;
  }

  const response = await fetch(
    `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&key=${process.env.NEXT_PUBLIC_PAGESPEED_API_KEY}`
  );
  if (!response.ok) {
    if (response.status === 500) {
      postReport({
        ...data,
        status: 0,
      });
    } else {
      postReport({
        ...data,
        status: 1,
      });
    }
    return;
  }
  const json = await response.json();
  const lighthouse = handleJSON(json);
  const report = {
    ...data,
    ...lighthouse,
    status: 3,
  };
  postReport(report);

  function handleJSON(json) {
    if (!json.lighthouseResult) return;
    if (!json.lighthouseResult.audits) return;

    let opportunities = [];
    const keys = Object.keys(json.lighthouseResult.audits);

    keys.forEach((key) => {
      const item = json.lighthouseResult.audits[key];
      const title = item.title;
      const description = item.description.split("[Learn more]")[0].trim();
      const savings = item.numericValue;
      const score = item.score;
      const details = item.details;
      if (savings && details && details.type === "opportunity" && score < 0.9) {
        opportunities.push({ title, description, savings });
      }
    });

    opportunities.sort((a, b) => b.savings - a.savings);

    const report = {
      url: json.lighthouseResult.finalUrl,
      performance: json.lighthouseResult.categories.performance.score,
      accessibility: json.lighthouseResult.categories.accessibility.score,
      bestPractices: json.lighthouseResult.categories["best-practices"].score,
      seo: json.lighthouseResult.categories.seo.score,
      opportunities,
    };

    return report;
  }
}
