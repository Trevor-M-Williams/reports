import { useEffect, useRef } from "react";

function Metric({ category, value, sidePanel }) {
  const circleRef = useRef(null);

  const sidePanelCategoryText = "text-[3vw] sm:text-base";
  const sidePanelScoreText = "text-[8vw] sm:text-4xl";

  const green = "#0c6";
  const red = "#f33";
  const yellow = "#fa3";

  let color = green;
  if (value < 80) color = yellow;
  if (value < 50) color = red;

  let offset = 1 - value / 100;

  useEffect(() => {
    setTimeout(() => {
      circleRef.current.style.transition = "all 1s ease-in-out";
      circleRef.current.setAttribute("stroke", color);
      circleRef.current.setAttribute("stroke-dashoffset", offset);
    }, 50);
  }, []);

  return (
    <div className="flex grow flex-col items-center p-1 lg:p-2">
      <div className="relative max-h-[30vh]">
        <svg viewBox="0 0 100 100" height="100%" width="100%">
          <clipPath id="clipPath">
            <circle cx="50" cy="50" r="45"></circle>
          </clipPath>
          <circle
            ref={circleRef}
            clipPath="url(#clipPath)"
            fill="#eee"
            strokeWidth="10"
            pathLength="1"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="1"
            strokeDashoffset="1"
          ></circle>
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center text-5xl font-medium text-gray-700 sm:text-[6vh] ${
            sidePanel ? sidePanelScoreText : null
          }`}
        >
          {value}
        </div>
      </div>
      <div
        className={`font-medium sm:mt-2 sm:text-2xl ${
          sidePanel ? sidePanelCategoryText : null
        }`}
      >
        {category}
      </div>
    </div>
  );
}

export default Metric;
