import Metric from "./Metric";

function Metrics({ data }) {
  const performance = data.performance * 100;
  const accessibility = data.accessibility * 100;
  const bestPractices = data.bestPractices * 100;
  const seo = data.seo * 100;

  return (
    <div className="h-[65vh] w-full max-w-lg mx-auto flex flex-wrap items-center px-2 select-none">
      <Metric category="Performance" value={performance} />
      <Metric category="Accessibility" value={accessibility} />
      <Metric category="Best Practices" value={bestPractices} />
      <Metric category="SEO" value={seo} />
    </div>
  );
}

export default Metrics;
