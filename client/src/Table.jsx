import React, { useState } from "react";
import "./Table.css";
import $ from "jquery";
import EachTable from "./eachTable";

function Table() {
  const [month, setMonth] = useState(["09", "2022", "2022-09"]);
  const selectmonth = (e) => {
    var selectMonth
    selectMonth = e.target.value.split("-")
    setMonth([selectMonth[1], selectMonth[0], e.target.value]);

  };


  return (
    <div>
      <div className="top-table">
        <p className="display-4">Expense Table</p>
        <input type="month" value={month[2]} onChange={(e) => selectmonth(e)} />
      </div>
      <EachTable month={month[0]} year={month[1]} />
    </div>
  );
}

export default Table;
