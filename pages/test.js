import React from "react";
import { useEffect, useState } from "react";
import { getReports } from "../firebase";
import Menu from "../components/dashboard/Menu";
import Content from "../components/dashboard/Content";
import Table from "../components/dashboard/Table";

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
        <Table reports={reports} />
      </Content>
    </div>
  );
}

export default test;
