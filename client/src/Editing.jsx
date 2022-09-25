import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiPlus, BiX } from "react-icons/bi";
import "./Edit.css";
import "./App.css";

function Editing() {
  const id = useParams();

  
  const [number, setNumber] = useState([1, 2, 3]);
  const pluslist = () => {
      setNumber([...number, number[number.length - 1] + 1]);
    };
    
    const removelist = () => {
        var newNum = number.slice(0, number.length - 1);
        setNumber([...newNum]);
    };
    
    const [state, setState] = useState({
        list: {},
        expense: {},

    });

    useEffect(() => {
      fetch("http://localhost:5000/edit", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id.id, list: state.list, expense: state.expense }),
        })
          .then((res) => res.json())
          .then((data) => {
              setState({...state, ["list"]: {...data.data.list}, ["expense"]: {...data.data.expense}})
          })
          .catch((err) => console.log(err));
    },[])

  const { list, expense } = state;

  const inputList = (id, event) => {
    let mylist = [];
    mylist.push(event.target.value);
    setState({ ...state, list: { ...list, [id]: mylist[0] } });
  };

  const inputExpense = (id, event) => {
    let myExpense = [];
    myExpense.push(event.target.value);
    setState({ ...state, expense: { ...expense, [id]: myExpense[0] } });
  };


  const changeData = () => {
    fetch("http://localhost:5000/edit", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id.id, list: state.list, expense: state.expense }),
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.status == 'complete'){
                window.location.href = '/table'
            }
        })
        .catch((err) => console.log(err));
  }

  var textlist = Object.keys(state.list).map(function (key) {
    return state.list[key];
  });

  var expenselist = Object.keys(state.expense).map(function (key) {
    return state.expense[key];
  });


  return (
    <div className="edit-layout">
      <p className="display-5">แก้ไขข้อมูล</p>
      <div className="formgroup d-flex justify-content-between">
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
                        value={textlist[num-1]}
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
                        value={expenselist[num-1]}
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
      <div className="button-group">
          <a href="/table" className="btn btn-primary">
            กลับไปที่ตาราง
          </a>
          <button
            className="btn btn-success save-data"
            onClick={() => changeData()}
          >
            บันทึก
          </button>
        </div>
    </div>
  );
}

export default Editing;
