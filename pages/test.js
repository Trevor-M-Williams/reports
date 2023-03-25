import React from "react";
import { useEffect, useState } from "react";
import { getReports } from "../firebase";
import Menu from "../components/Menu";
import Content from "../components/Content";
import DataTable from "../components/Table";

function test() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports(setReports);
  }, []);

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  return (
    <div className="absolute inset-0 flex">
      <Menu />
      <Content>
        <DataTable reports={reports} />
      </Content>
    </div>
  );
}

export default test;
