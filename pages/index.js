import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Report from "../components/Report";
import { database } from "../components/database";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState();
  const [start, setStart] = useState(Date.now());
  const inputRef = useRef();

  useEffect(() => {
    const { url } = router.query;
    if (url) {
      let json = database.find((item) => item.url === url);
      if (json) {
        setData(json);
      } else {
        setData(null);
        // hit the API
      }
      return;
    }
    setData(false);
    inputRef.current.classList.remove("opacity-0");
  }, [router.query]);

  if (!data)
    return (
      <div
        ref={inputRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 delay-500"
      >
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <input
            type="text"
            placeholder="Enter Your Website URL"
            className="w-[60vw] max-w-2xl h-12 text-lg border border-gray-400 rounded text-center placeholder:text-center sm:text-left sm:placeholder:text-left focus:border-blue-500"
          />
          <button className="mt-4 sm:ml-4 sm:mt-0 h-12 px-6 bg-[#0066ff] text-lg text-white hover:shadow rounded">
            Analyze
          </button>
        </div>
      </div>
    );

  return <Report data={data} />;
}
