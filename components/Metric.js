import { useEffect, useRef } from "react";

function Metric({ category, value }) {
  const circleRef = useRef(null);

  const green = "#0c6";
  const red = "#f33";
  const yellow = "#fa3";

  let color = green;
  if (value < 80) color = yellow;
  if (value < 40) color = red;

  let offset = 1 - value / 100;

  useEffect(() => {
    setTimeout(() => {
      circleRef.current.style.transition = "all 1s ease-in-out";
      circleRef.current.setAttribute("stroke", color);
      circleRef.current.setAttribute("stroke-dashoffset", offset);
    }, 50);
  }, []);

  return (
    <div className="mx-[5%] flex flex-col items-center py-4 sm:py-2">
      <div className="relative">
        <svg viewBox="0 0 100 100" style={{ height: "min(25vh, 40vw)" }}>
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
          className={`absolute inset-0 flex items-center justify-center text-5xl sm:text-[6vh] text-gray-700 font-medium`}
        >
          {value}
        </div>
      </div>
      <div className="text-2xl font-medium sm:mt-2">{category}</div>
    </div>
  );
}

export default Metric;
