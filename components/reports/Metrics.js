import Metric from "./Metric";

function Metrics({ data }) {
  const performance = Math.round(data.performance * 100);
  const accessibility = Math.round(data.accessibility * 100);
  const bestPractices = Math.round(data.bestPractices * 100);
  const seo = Math.round(data.seo * 100);

  return (
    <div className="mx-auto flex h-full w-max max-w-full select-none flex-col">
      <div className="flex h-1/2 justify-center">
        <Metric category="Performance" value={performance} />
        <Metric category="Accessibility" value={accessibility} />
      </div>
      <div className="flex h-1/2 justify-center">
        <Metric category="Best Practices" value={bestPractices} />
        <Metric category="SEO" value={seo} />
      </div>
    </div>
  );
}

export default Metrics;
