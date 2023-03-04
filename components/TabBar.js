function TabBar({ tab, setTab }) {
  const bg = "bg-gray-200";

  return (
    <div className="w-3/4 max-w-md mt-6 mb-4 border-2 border-gray-200 rounded-full flex text-lg font-medium overflow-hidden">
      <div
        onClick={() => setTab(0)}
        className={`w-1/2 py-[0.4rem] flex items-center justify-center border-r cursor-pointer ${
          tab === 0 ? bg : "bg-transparent"
        }`}
      >
        Metrics
      </div>
      <div
        onClick={() => setTab(1)}
        className={`w-1/2 flex items-center justify-center cursor-pointer ${
          tab === 1 ? bg : "bg-transparent"
        }`}
      >
        Suggestions
      </div>
    </div>
  );
}

export default TabBar;
