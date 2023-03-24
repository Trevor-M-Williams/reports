import React from "react";
import { useEffect, useState } from "react";
import { getReports } from "../firebase";
import EnhancedTable from "../components/Table";

function test() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports(setReports);
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <EnhancedTable reports={reports} />
    </div>
  );
}

export default test;
