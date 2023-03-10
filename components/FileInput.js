import { useState } from "react";

function FileInput({ reports, setReports, uploadOpen, setUploadOpen }) {
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState();
  const [messageColor, setMessageColor] = useState("text-gray-700");
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [file, setFile] = useState();
  const opacity = uploadOpen ? "opacity-100" : "opacity-0 pointer-events-none";

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
    setFile(e.dataTransfer.files[0]);
  }

  function handleFileInputChange(e) {
    setFile(e.target.files[0]);
  }

  function handleRemoveFileClick() {
    setFile();
  }

  async function handleCSV(data) {
    const BATCH_SIZE = 5; // number of URLs to fetch in parallel
    let rows = data.split("\n");
    let batches = [];
    for (let i = 1; i < 21; i += BATCH_SIZE) {
      let batch = rows.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }
    let promises = batches.map(async (batch) => {
      let reports = [];
      for (let row of batch) {
        let url = row.split(",")[0];
        if (url) {
          url = url.replace("http:", "https:").trim();
          let report = await generateReport(url);
          reports.push(report);
        }
      }
      return reports;
    });
    let reports = await Promise.all(promises).then((results) => results.flat());
    setReports([...reports]);
  }

  function handleUpload() {
    if (file.type !== "text/csv") {
      setMessage("File must be a CSV");
      setMessageColor("text-red-700");
      return;
    }
    setUploadDisabled(true);
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
      const report = await res.json();
      return report;
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
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-4 transition-opacity duration-500 ${opacity}`}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-16">
        <div
          onClick={() => setUploadOpen(false)}
          className=" absolute top-1 left-2 cursor-pointer text-2xl font-bold text-gray-400"
        >
          X
        </div>
        {!file ? (
          <div
            className={`rounded-md border-2 border-dashed py-16 text-center ${
              dragging ? "border-blue-500" : "border-gray-400"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            onDrop={handleDrop}
          >
            <>
              <p className="text-2xl text-gray-400">Drag and drop file here</p>
              <input
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <button
                className="mt-8 rounded bg-blue-500 py-2 px-4 font-medium text-white hover:bg-blue-700"
                onClick={() =>
                  document.querySelector("input[type=file]").click()
                }
              >
                Select file
              </button>
            </>
          </div>
        ) : (
          <div className="mt-4 max-h-[50vh] w-full overflow-auto">
            <div className="flex flex-col items-center justify-between">
              <div className="flex w-full items-center justify-between px-2 text-xl">
                <div>
                  <p>{file.name}</p>
                </div>
                <button
                  onClick={handleRemoveFileClick}
                  className="h-5 w-5 shrink-0"
                >
                  <svg
                    fill="#333"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 8.70007H4C3.90151 8.70007 3.80398 8.68067 3.71299 8.64298C3.62199 8.60529 3.53931 8.55005 3.46967 8.4804C3.40003 8.41076 3.34478 8.32808 3.30709 8.23709C3.2694 8.14609 3.25 8.04856 3.25 7.95007C3.25 7.85158 3.2694 7.75405 3.30709 7.66306C3.34478 7.57207 3.40003 7.48939 3.46967 7.41974C3.53931 7.3501 3.62199 7.29486 3.71299 7.25716C3.80398 7.21947 3.90151 7.20007 4 7.20007H20C20.1989 7.20007 20.3897 7.27909 20.5303 7.41974C20.671 7.5604 20.75 7.75116 20.75 7.95007C20.75 8.14899 20.671 8.33975 20.5303 8.4804C20.3897 8.62106 20.1989 8.70007 20 8.70007Z" />
                    <path d="M16.44 20.75H7.56C7.24309 20.7717 6.92503 20.7303 6.62427 20.6281C6.3235 20.5259 6.04601 20.3651 5.80788 20.1548C5.56975 19.9446 5.37572 19.6892 5.23704 19.4034C5.09836 19.1177 5.01779 18.8072 5 18.49V8.00005C5 7.80113 5.07902 7.61037 5.21967 7.46972C5.36032 7.32906 5.55109 7.25005 5.75 7.25005C5.94891 7.25005 6.13968 7.32906 6.28033 7.46972C6.42098 7.61037 6.5 7.80113 6.5 8.00005V18.49C6.5 18.9 6.97 19.25 7.5 19.25H16.38C16.94 19.25 17.38 18.9 17.38 18.49V8.00005C17.38 7.78522 17.4653 7.57919 17.6172 7.42729C17.7691 7.27538 17.9752 7.19005 18.19 7.19005C18.4048 7.19005 18.6109 7.27538 18.7628 7.42729C18.9147 7.57919 19 7.78522 19 8.00005V18.49C18.9822 18.8072 18.9016 19.1177 18.763 19.4034C18.6243 19.6892 18.4303 19.9446 18.1921 20.1548C17.954 20.3651 17.6765 20.5259 17.3757 20.6281C17.075 20.7303 16.7569 20.7717 16.44 20.75ZM16.56 7.75005C16.4611 7.75139 16.363 7.73291 16.2714 7.6957C16.1798 7.65848 16.0966 7.60329 16.0267 7.53337C15.9568 7.46346 15.9016 7.38024 15.8644 7.28864C15.8271 7.19704 15.8087 7.09891 15.81 7.00005V5.51005C15.81 5.10005 15.33 4.75005 14.81 4.75005H9.22C8.67 4.75005 8.22 5.10005 8.22 5.51005V7.00005C8.22 7.19896 8.14098 7.38972 8.00033 7.53038C7.85968 7.67103 7.66891 7.75005 7.47 7.75005C7.27109 7.75005 7.08032 7.67103 6.93967 7.53038C6.79902 7.38972 6.72 7.19896 6.72 7.00005V5.51005C6.75872 4.88136 7.04203 4.29281 7.50929 3.87041C7.97655 3.44801 8.5906 3.22533 9.22 3.25005H14.78C15.4145 3.21723 16.0362 3.43627 16.51 3.8595C16.9838 4.28273 17.2713 4.87592 17.31 5.51005V7.00005C17.3113 7.09938 17.2929 7.19798 17.2558 7.29013C17.2187 7.38228 17.1637 7.46615 17.0939 7.53685C17.0241 7.60756 16.941 7.6637 16.8493 7.70201C16.7577 7.74033 16.6593 7.76006 16.56 7.76005V7.75005Z" />
                    <path d="M10.22 17.0001C10.0219 16.9975 9.83263 16.9177 9.69253 16.7776C9.55244 16.6375 9.47259 16.4482 9.47 16.2501V11.7201C9.47 11.5212 9.54902 11.3304 9.68967 11.1898C9.83032 11.0491 10.0211 10.9701 10.22 10.9701C10.4189 10.9701 10.6097 11.0491 10.7503 11.1898C10.891 11.3304 10.97 11.5212 10.97 11.7201V16.2401C10.9713 16.3394 10.9529 16.438 10.9158 16.5302C10.8787 16.6223 10.8237 16.7062 10.7539 16.7769C10.6841 16.8476 10.601 16.9037 10.5093 16.9421C10.4177 16.9804 10.3193 17.0001 10.22 17.0001Z" />
                    <path d="M13.78 17.0001C13.5811 17.0001 13.3903 16.9211 13.2497 16.7804C13.109 16.6398 13.03 16.449 13.03 16.2501V11.7201C13.03 11.5212 13.109 11.3304 13.2497 11.1898C13.3903 11.0491 13.5811 10.9701 13.78 10.9701C13.9789 10.9701 14.1697 11.0491 14.3103 11.1898C14.451 11.3304 14.53 11.5212 14.53 11.7201V16.2401C14.53 16.4399 14.4513 16.6317 14.3109 16.774C14.1706 16.9162 13.9798 16.9975 13.78 17.0001Z" />
                  </svg>
                </button>
              </div>
              <button
                disabled={uploadDisabled}
                className={`bg-blue-500 ${
                  !uploadDisabled ? "hover:bg-blue-700" : null
                } mt-8 rounded py-2 px-4 font-medium text-white`}
                onClick={handleUpload}
              >
                {uploadDisabled ? "Uploading..." : "Upload"}
              </button>
              <p className={`${messageColor} mt-2 text-sm`}>{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileInput;