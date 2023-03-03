import Metric from "./Metric";

function Metrics() {
  return (
    <div className="h-[65vh] w-full max-w-lg mx-auto flex flex-wrap items-center px-2 select-none">
      <Metric category="Performance" value={35} />
      <Metric category="Accessibility" value={88} />
      <Metric category="Best Practices" value={75} />
      <Metric category="SEO" value={82} />
    </div>
  );
}

export default Metrics;
