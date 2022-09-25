import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BiPlus, BiX } from "react-icons/bi";
import Swal from "sweetalert2";

function App() {

  const [number, setNumber] = useState([1, 2, 3]);
  const pluslist = () => {
    setNumber([...number, number[number.length - 1] + 1]);
  };

  const removelist = () => {
    var newNum = number.slice(0, number.length - 1);
    setNumber([...newNum]);
  };

  const [state, setState] = useState({
    date: "",
    list: {},
    month: "",
    year:"",
    expense: {},
  });

  const { date, list, expense } = state;

  const inputValue = (name, event) => {
    var month;
    if (name == "date") {
      month = event.target.value.split("-");
      setState({ ...state, ["month"]: month[1], ["year"]: month[0], [name]: event.target.value });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const inputList = (id, event) => {
    let mylist = [];
    mylist.push(event.target.value);
    setState({ ...state, list: { ...list, [id]: mylist[0] } });
  };

  const inputExpense = (id, event) => {
    let myExpense = [];
    myExpense.push(event.target.value);
    setState({ ...state, expense: { ...expense, [id]: myExpense[0]||0 } });
  };
  const insertData = () => {
    const data = { ...state };
    fetch("http://localhost:5000/insert", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "errors") {
          Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน", "warning", "warning");
        } else {
          Swal.fire("บันทึกข้อมูลเรียบร้อย", "success", "success").then(() =>
            window.location.reload()
          );
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removeEmptylist = () => {
    var listobj = {}
    var lists = Object.keys(state.list).map(function (key) {
      return state.list[key];
    });
    for(let i = 0; i < lists.length; i++){
      if(lists[i] == ''){
        lists = lists.slice(0, i)
      }else{
        listobj = {...listobj, [`text${i + 1}`]: lists[i]}
      }
    }
    return listobj
  }

  const removeEmptyexpense = () => {
    var listobj = {}
    var lists = Object.keys(state.expense).map(function (key) {
      return state.expense[key];
    });
    for(let i = 0; i < lists.length; i++){
      if(lists[i] == ''){
        lists = lists.slice(0, i)
      }else{
        listobj = {...listobj, [`text${i + 1}`]: lists[i]}
      }
    }
    return listobj
  }



  return (
    <div className="App">
      <div className="layout-box">
        <h1 className="display-4">บันทึกรายจ่าย</h1>
        <div className="save-box">
          <div>
            <div className="formgroup d-flex justify-content-between">
              <label className="label-size">
                <p>รายการ</p>
              </label>
              <div className="d-flex align-items-center gap-3">
                <label className="label-size">วัน/เดือน/ปี</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => inputValue("date", e)}
                />
              </div>
            </div>
            <div className="formgroup">
              <div className="money-list">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">รายการที่</th>
                      <th scope="col">รายระเอียด</th>
                      <th scope="col">จำนวนเงิน (บาท)</th>
                    </tr>
                  </thead>
                  <tbody class="my-table">
                    {number.map((num) => {
                      return (
                        <tr key={num}>
                          <th
                            scope="row"
                            className="px-3 py-2 d-flex justify-content-center align-items-center"
                            style={{ height: "60px" }}
                          >
                            {num}
                          </th>
                          <td>
                            <input
                              className="description px-3 py-2"
                              id={`text${num}`}
                              type="text"
                              style={{ width: "100%" }}
                              onChange={(e) => inputList(`text${num}`, e)}
                            />
                          </td>
                          <td>
                            <input
                              className="amount-money px-3 py-2"
                              id={`num${num}`}
                              type="number"
                              placeholder="0"
                              style={{ width: "80px" }}
                              onChange={(e) => inputExpense(`num${num}`, e)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="add-delete d-flex gap-3 justify-content-center">
                  <div className="plus-list">
                    <BiPlus onClick={() => pluslist()} />
                  </div>
                  <div className="remove-list">
                    <BiX onClick={() => removelist()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-group">
          <a href="/table" className="btn btn-primary">
            ดูตาราง
          </a>
          <button
            className="btn btn-success save-data"
            onClick={() => insertData()}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
