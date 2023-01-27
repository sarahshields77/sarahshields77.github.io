function createTable() {
    var table = document.getElementById("table");
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    
    table.innerHTML = "";
    
    for (var r = 1; r <= rows; r++) {
      var row = table.insertRow();
      for (var c = 1; c <= cols; c++) {
        var cell = row.insertCell();
        cell.innerHTML = r + " x " + c + " = " + r * c;
      }
    }
  }