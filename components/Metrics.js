import Metric from "./Metric";

function Metrics() {
  return (
    <div className="h-full w-full max-w-2xl mx-auto flex flex-wrap select-none">
      <Metric category="Performance" value={35} />
      <Metric category="Accessibility" value={88} />
      <Metric category="Best Practices" value={75} />
      <Metric category="SEO" value={82} />
    </div>
  );
}

export default Metrics;
