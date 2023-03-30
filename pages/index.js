import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Report from "../components/reports/Report";
import { getReports } from "../firebase";

export default function Home() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [data, setData] = useState();
  const inputRef = useRef();

  useEffect(() => {
    getReports(setReports);
  }, []);

  useEffect(() => {
    handleQuery();
  }, [reports]);

  function handleQuery() {
    const { url } = router.query;
    if (url) {
      let data = reports.find((report) => report.url === url);
      if (data) setData(data);
      else setData(null);
      return;
    }
    setData(false);
    inputRef.current.classList.remove("opacity-0");
  }

  if (!data)
    return (
      <div
        ref={inputRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity delay-500 duration-500"
      >
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <input
            type="text"
            placeholder="Enter Your Website URL"
            className="h-12 w-[60vw] max-w-2xl rounded border border-gray-400 text-center text-lg placeholder:text-center focus:border-blue-500 sm:text-left sm:placeholder:text-left"
          />
          <button className="mt-4 h-12 rounded bg-[#0066ff] px-6 text-lg text-white hover:shadow sm:ml-4 sm:mt-0">
            Analyze
          </button>
        </div>
      </div>
    );

  return <Report data={data} />;
}
