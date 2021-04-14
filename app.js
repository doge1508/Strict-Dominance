function save() {
  console.log("Saving...");
  let data = [
    [
      [f("DA1"), f("DA2")],
      [f("DB1"), f("DB2")],
      [f("DC1"), f("DC2")],
    ],
    [
      [f("EA1"), f("EA2")],
      [f("EB1"), f("EB2")],
      [f("EC1"), f("EC2")],
    ],
    [
      [f("FA1"), f("FA2")],
      [f("FB1"), f("FB2")],
      [f("FC1"), f("FC2")],
    ],
  ];
  drawTable(data);
  return data;
}

function drawTable(data) {
  let table = document.createElement("table");
  for (let i = 0; i < 4; i++) {
    let tr = document.createElement("tr");
    if (i === 0) {
      for (let j = 0; j < 4; j++) {
        let th = document.createElement("th");
        switch (j) {
          case 1:
            th.innerHTML = "A";
            break;
          case 2:
            th.innerHTML = "B";
            break;
          case 3:
            th.innerHTML = "C";
            break;
        }
        tr.appendChild(th);
      }
    } else {
      let th = document.createElement("th");
      switch (i) {
        case 1:
          th.innerHTML = "D";
          break;
        case 2:
          th.innerHTML = "E";
          break;
        case 3:
          th.innerHTML = "F";
          break;
      }
      tr.appendChild(th);
      for (let j = 1; j < 4; j++) {
        let td = document.createElement("td");
        td.innerHTML =
          "(" + data[i - 1][j - 1][0] + ", " + data[i - 1][j - 1][1] + ")";
        tr.appendChild(td);
      }
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}

function f(id) {
  return Number(document.getElementById(id).value);
}

function clearData() {
  console.log("clearing");
  let els = document.getElementsByTagName("input");
  for (let i = 0; i < els.length; i++) {
    if (els[i].type === "text") {
      els[i].value = "";
    }
  }
}

function randomize() {
  console.log("randomizing");
  let els = document.getElementsByTagName("input");
  for (let i = 0; i < els.length; i++) {
    if (els[i].type === "text") {
      els[i].value = Math.floor(Math.random() * 101);
    }
  }
}

function check() {
  let data = save();
  let activeRows = [];
  let activeCols = [];
  let foundDomRow = true;
  let foundDomCol = true;
  let isChecking = true;
  for (let row = 0; row < data.length; row++) {
    activeRows.push(true);
  }
  for (let col = 0; col < data[0].length; col++) {
    activeCols.push(true);
  }
  while (isChecking) {
    console.log(foundDomRow + ", " + foundDomCol);
    foundDomCol = false;
    for (let left = 0; left < data[0].length - 1; left++) {
      if (!activeCols[left]) {
        continue;
      }
      for (let right = left + 1; right < data[0].length; right++) {
        if (!activeCols[right]) {
          continue;
        }
        let result = colDomCol(left, right, data);
        switch (result) {
          case -1:
            activeCols[right] = false;
            foundDomCol = true;
            //console.log("col " + left + " dominates " + "col " + right);
            break;
          case 0:
            foundDomCol = false;
            //console.log("neither col dominates");
            break;
          case 1:
            activeCols[left] = false;
            foundDomCol = true;
            //console.log("col " + right + " dominates " + "col " + left);
            break;
        }
      }
    }

    if (!foundDomCol && !foundDomRow) {
      isChecking = false;
      continue;
    }
    foundDomRow = false;
    for (let top = 0; top < data.length - 1; top++) {
      if (!activeRows[top]) {
        continue;
      }
      for (let bottom = top + 1; bottom < data.length; bottom++) {
        if (!activeRows[bottom]) {
          continue;
        }
        let result = rowDomRow(top, bottom, data);
        switch (result) {
          case -1:
            activeRows[bottom] = false;
            foundDomRow = true;
            //console.log("row " + top + " dominates " + "row " + bottom);
            break;
          case 0:
            foundDomRow = false;
            //console.log("neither row dominates");
            break;
          case 1:
            activeRows[top] = false;
            foundDomRow = true;
            //console.log("row " + bottom + " dominates " + "row " + top);
            break;
        }
      }
    }
    if (!foundDomRow) {
      isChecking = false;
    }
  }
  //TODO: good, but missing last step
  //TODO: finish and generate report
  console.log(activeRows);
  console.log(activeCols);
}

function colDomCol(colA, colB, data) {
  let value = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][colA][1] < data[i][colB][1]) {
      value += 1;
    } else if (data[i][colB][1] < data[i][colA][1]) {
      value -= 1;
    } else value += 0;
  }
  if (value === data.length) return 1;
  if (value === -data.length) return -1;
  return 0;
}

function rowDomRow(rowA, rowB, data) {
  let value = 0;
  for (let i = 0; i < data[0].length; i++) {
    if (data[rowA][i][0] < data[rowB][i][0]) {
      value += 1;
    } else if (data[rowB][i][0] < data[rowA][i][0]) {
      value -= 1;
    } else value += 0;
  }
  if (value === data[0].length) return 1;
  if (value === -data[0].length) return -1;
  return 0;
}
