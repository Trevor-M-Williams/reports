import { useEffect, useRef } from "react";

function Metric({ category, value, sidePanel }) {
  const circleRef = useRef(null);

  const categoryText = "sm:text-2xl";
  const scoreText = "text-5xl sm:text-[6vh]";
  const sidePanelCategoryText = "text-[3vw] sm:text-lg lg:text-base";
  const sidePanelScoreText = "text-[8vw] sm:text-5xl lg:text-4xl xl:text-5xl";

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
  });

  return (
    <div className="flex h-full flex-col items-center p-1 lg:p-2">
      <div className="relative h-4/5">
        <svg viewBox="0 0 100 100" height="100%" width="100%">
          <circle fill="#eee" strokeWidth="0" cx="50" cy="50" r="45"></circle>
          <circle
            ref={circleRef}
            fill="transparent"
            strokeWidth="5"
            pathLength="1"
            cx="50"
            cy="50"
            r="42.5"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
          ></circle>
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center font-medium text-gray-700 ${
            sidePanel ? sidePanelScoreText : scoreText
          }`}
        >
          {value}
        </div>
      </div>
      <div
        className={`font-medium sm:mt-2 ${
          sidePanel ? sidePanelCategoryText : categoryText
        }`}
      >
        {category}
      </div>
    </div>
  );
}

export default Metric;
