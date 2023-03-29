function TabBar({ tab, setTab }) {
  const bg = "bg-gray-200";

  return (
    <div className="mt-6 mb-4 flex w-3/4 max-w-md overflow-hidden rounded-full border-2 border-gray-200 text-lg font-medium">
      <div
        onClick={() => setTab(0)}
        className={`flex w-1/2 cursor-pointer items-center justify-center border-r py-[0.4rem] ${
          tab === 0 ? bg : "bg-transparent"
        }`}
      >
        Metrics
      </div>
      <div
        onClick={() => setTab(1)}
        className={`flex w-1/2 cursor-pointer items-center justify-center ${
          tab === 1 ? bg : "bg-transparent"
        }`}
      >
        Suggestions
      </div>
    </div>
  );
}

export default TabBar;
