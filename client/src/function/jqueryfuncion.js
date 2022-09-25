import $ from "jquery";

export default function addrow () {
  var index = 1;
  $(".plus-list").click(function () {
    index++;
    var mylist = `<tr><th scope='row' >${index}</th><td><input className='decription' type='text' id='text'/></td><td><input class='amount-money' type='number' /></tr>`;
    $(".my-table").append(mylist);
  });
}
