export const data = {
  performance: 0.69,
  accessibility: 0.85,
  bestPractices: 1,
  seo: 0.9,
  opportunities: [
    {
      title: "Serve images in next-gen formats",
      description:
        "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.",
      savings: 2920,
    },
    {
      title: "Reduce unused JavaScript",
      description:
        "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.",
      savings: 900,
    },
    {
      title: "Enable text compression",
      description:
        "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes.",
      savings: 740,
    },
    {
      title: "Efficiently encode images",
      description:
        "Optimized images load faster and consume less cellular data.",
      savings: 520,
    },
    {
      title: "Reduce unused CSS",
      description:
        "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity.",
      savings: 400,
    },
    {
      title: "Properly size images",
      description:
        "Serve images that are appropriately-sized to save cellular data and improve load time.",
      savings: 160,
    },
  ],
};
