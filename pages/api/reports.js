export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const url = req.query.url;
      const response = await fetch(
        `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&key=${process.env.PAGESPEED_API_KEY}`
      );
      const data = await response.json();
      const report = handleData(data);
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

function handleData(data) {
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
