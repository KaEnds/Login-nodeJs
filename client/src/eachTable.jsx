import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import Swal from "sweetalert2";

$(document).ready(function(){
  $(".edit").click(() => {
    $(".edit-col").toggle(),
    $(".delete-col").hide()
  })
  $(".delete").click(() => {
    $(".delete-col").toggle(),
    $(".edit-col").hide()
  })
})

function EachTable(prop) {
  const { month, year } = prop;

  const [data, setData] = useState([]);
  const [isdata, setIsdata] = useState();

  const editing = (id) => {
    window.location.href = `http://127.0.0.1:5173/table/edit${id}`
  }

  const deleting = (id) => {
    Swal.fire({
      title: 'ต้องการจะลบข้อมูลนี้หรือไม่',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ตกลง',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch("http://localhost:5000/delete", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
        .then((res) => res.json())
        .then((data) => {
          if(data.status == 'complete'){
              Swal.fire('Done!', '', 'success').then(
                window.location.href = '/table'
              )
              }
          })
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        $(document).ready(function(){
          $(".delete-col").hide()
        })
      }
    })

  }


  useEffect(() => {
    fetch("http://localhost:5000/table", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ month: month, year: year }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "complete") {
          setData(data.data);
          setIsdata(true);
        } else {
          setIsdata(false);
        }
      })
      .catch((err) => console.log(err));
  }, [month]);

  var totallist = [];
  data.map((data) => {
    var expenses = Object.keys(data.expense).map(function (key) {
      return parseInt(data.expense[key]);
    });
    expenses.map((arr) => {
      totallist.push(arr);
    });
  });

  const total = totallist.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return (
    <div>
      {isdata ? (
        <div>
          <div className="layout">
            <table class="table table-bordered table-striped border-dark">
              <thead>
                <tr>
                  <th scope="col">เดือน</th>
                  <th scope="col">วันที่</th>
                  <th scope="col">รายการ</th>
                  <th scope="col">รายจ่าย (บาท)</th>
                  <th scope="col">รวม</th>
                  <th scope="col" className="edit-col">edite</th>
                  <th scope="col" className="delete-col">delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => {
                  const monthNames = [
                    "มกราคม",
                    "กุมภาพันธ์",
                    "มีนาคม",
                    "เมษายน",
                    "พฤษภาคม",
                    "มิถุนาคม",
                    "กรกฎาคม",
                    "สิงหาคม",
                    "กันยายน",
                    "ตุลาคม",
                    "พฤษจิกายน",
                    "ธันวาคม",
                  ];

                  const datelist = data.date.split("-");

                  var lists = Object.keys(data.list).map(function (key) {
                    return data.list[key];
                  });

                  var expenses = Object.keys(data.expense).map(function (key) {
                    return parseInt(data.expense[key]);
                  });

                  const sum = expenses.reduce((accumulator, value) => {
                    return accumulator + value;
                  }, 0);

                  return (
                    <tr id={data._id}>
                      <th scope="row">{monthNames[Number(datelist[1]) - 1]}</th>
                      <td>{datelist[2]}</td>
                      <td>
                        <ul>
                          {lists.map((list, index) => {
                            return (
                              <li className="text-start My-list" key={index}>
                                {list}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {expenses.map((expense, index) => {
                            return (
                              <li className="text-start My-list" key={index}>
                                {expense}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>{sum}</td>
                      <td className="edit-col"><button className="btn btn-warning" onClick={() => editing(data._id)}>แก้ไข</button></td>
                      <td className="delete-col"><button className="btn btn-danger" onClick={() => deleting(data._id)}>ลบ</button></td>
                    </tr>
                  );
                })}
                <tr>
                  <th colSpan={4}>รวมทั้งหมด</th>
                  <td>{total}</td>
                  <td className="edit-col"></td>
                  <td className="delete-col"></td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <p className="nodata-img"><img src="https://previews.123rf.com/images/badbrother/badbrother2007/badbrother200700285/151037103-no-search-results-404-page-not-found-concept-upset-cartoon-character-with-search-magnifying-glass-fl.jpg" alt="" /></p>
          <p className="display-7 text-center nodata">No data of this month</p>
        </div>
      )}
      <div className="d-flex gap-3 justify-content-center">
        <a href="/" className="btn btn-primary">
          หน้าหลัก
        </a>
        <button className="btn btn-warning edit">แก้ไข</button>
        <button className="btn btn-danger delete">ลบข้อมูล</button>
      </div>
    </div>
  );
}

export default EachTable;
