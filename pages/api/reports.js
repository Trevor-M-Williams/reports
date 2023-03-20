import { postReport } from "../../firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;
    let url = data.url || data.website;
    try {
      if (url) {
        res.status(200).json({ message: "Generating report" });
        const response = await fetch(
          `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&key=${process.env.PAGESPEED_API_KEY}`
        );
        const json = await response.json();
        const lighthouse = handleJSON(json);
        const report = {
          ...data,
          ...lighthouse,
          status: 3,
        };
        postReport(report);
        console.log(report);
      } else {
        console.log("no url");
        postReport({
          ...data,
          status: 1,
        });
        res.status(418).json({ message: "No URL" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
}

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
