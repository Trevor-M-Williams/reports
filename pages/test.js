import { postReport } from "../firebase";

function test() {
  function generateReport(data) {
    if (!data) return;
    if (!data.lighthouseResult) return;
    if (!data.lighthouseResult.audits) return;

    let keys = Object.keys(data.lighthouseResult.audits);

    let opportunities = [];

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
      let url = row.split(",")[0];
      if (url) {
        let data = await runPageSpeedTest(url);
        let report = generateReport(data);
        postReport(report);
      }
    });
  }

  function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      handleCSV(result);
    });
    reader.readAsText(file);
  }

  async function runPageSpeedTest(url) {
    try {
      let res = await fetch(
        `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`
      );
      let data = await res.json();
      return data;
    } catch (error) {
      console.log("Error: " + url);
      console.log(error);
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <input
        type="file"
        placeholder="Enter a URL"
        onChange={(e) => readFile(e.target.files[0])}
        className="w-[60vw] max-w-lg rounded mr-4"
      />
    </div>
  );
}

export default test;
