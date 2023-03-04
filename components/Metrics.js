import Metric from "./Metric";

function Metrics({ data }) {
  const performance = data.performance * 100;
  const accessibility = data.accessibility * 100;
  const bestPractices = data.bestPractices * 100;
  const seo = data.seo * 100;

  return (
    <div className="lg:h-full flex flex-col justify-center px-2 select-none">
      <div className="flex justify-center">
        <Metric category="Performance" value={performance} />
        <Metric category="Accessibility" value={accessibility} />
      </div>
      <div className="flex justify-center">
        <Metric category="Best Practices" value={bestPractices} />
        <Metric category="SEO" value={seo} />
      </div>
    </div>
  );
}

export default Metrics;
