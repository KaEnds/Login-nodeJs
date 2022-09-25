import React from "react";

function Datainput() {
  return (
    <div>
      <tbody class="my-table">
        <tr>
          <th scope="row">1</th>
          <td>
            <input
              className="description"
              id="text1"
              type="text"
              onChange={(e) => inputList("text1", e)}
            />
          </td>
          <td>
            <input
              className="amount-money"
              id="num1"
              type="number"
              onChange={(e) => inputExpense("num1", e)}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>
            <input
              className="description"
              id="text2"
              type="text"
              onChange={(e) => inputList("text2", e)}
            />
          </td>
          <td>
            <input
              className="amount-money"
              id="num2"
              type="number"
              onChange={(e) => inputExpense("num2", e)}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>
            <input
              className="description"
              id="text3"
              type="text"
              onChange={(e) => inputList("text3", e)}
            />
          </td>
          <td>
            <input
              className="amount-money"
              id="num3"
              type="number"
              onChange={(e) => inputExpense("num3", e)}
            />
          </td>
        </tr>
      </tbody>
    </div>
  );
}

export default Datainput;
