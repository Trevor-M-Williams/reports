export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const url = req.query.url;
      const response = await fetch(
        `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=MOBILE&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&key=${process.env.PAGESPEED_API_KEY}`
      );
      const data = await response.json();
      await res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
