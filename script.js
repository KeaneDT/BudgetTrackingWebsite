$(document).ready(function () {
  $(".topSubmit").click(topSubmit);
  $(".bottomSubmit").click(addExpense);
  $(".clearEL").click(clearList);
  $(".saveEL").click(saveData);
  $(".loadEL").click(loadData);
  $(".delData").click(delData);
  $(".saveChange").click(saveChanges);
  $(".toggleChart").click(function () {
    $(".chartBox").toggle();
  });
});

var noClick = 0;
var saveNo = 0;
let saveFile = [];
let loadFile = [];

//First DOughnut Chart to showcase the categories
var catData = [0, 0, 0, 0, 0, 0];
var catLabels = [
  "Entertainment",
  "Food & Beverages",
  "Transportation",
  "Bills & Utilities",
  "Savings",
  "Others",
];

var ctx = document.getElementById("pieExpense").getContext("2d");

var chart1 = new Chart(ctx, {
  // Doughnut chart for the categories
  type: "doughnut",
  // The data for our dataset
  data: {
    labels: catLabels,
    datasets: [
      {
        label: "Categories",
        backgroundColor: [
          "#5DA5DA",
          "#FAA43A",
          "#F15854",
          "#B276B2",
          "#60BD68",
          "#4D4D4D",
        ],
        data: catData,
      },
    ],
  },
  // Configuration options go here
  options: {
    responsive: true,
  },
});

//Functions:
function topSubmit() {
  month = document.getElementById("monthInput").value;
  budget = document.getElementById("budgetInput").value;
  budget = budget.replace(/\D/g, "");

  if (month == 0) {
    alert("Month Field is empty!");
  } else if (budget == 0 || budget < 0) {
    alert("Budget Field is empty or has a negative value!");
  } else {
    if (noClick > 0) {
      var r = confirm(
        "Clicking OK will clear Expense List. Are you sure you want to continue?"
      );
      if (r == true) {
        $(".monthText").empty();
        $(".monthText").html(month);
        $(".expenseItems").empty();
        $(".budgetText").empty();
        $(".budgetText").append("$");
        $(".budgetText").append(budget);
        $(".balanceText").empty();
        $(".balanceText").append("$");
        $(".balanceText").append(budget);
        catData = [0, 0, 0, 0, 0, 0];
        chart1.destroy();
        generateCat();
        noClick = 0;
      }
    } else {
      $(".monthText").html(month);
      $(".expenseItems").empty();
      $(".budgetText").empty();
      $(".budgetText").append("$");
      $(".budgetText").append(budget);
      $(".balanceText").empty();
      $(".balanceText").append("$");
      $(".balanceText").append(budget);
    }
  }
}

function addExpense() {
  balance = document.getElementById("balance").innerHTML;
  balance = balance.replace(/(?!-)[^0-9.]/g, "");

  if (balance <= 0) {
    alert("Balance is less than or equal to 0!");
  } else {
    expense = document.getElementById("expenseInput").value;
    category = document.getElementById("expenseCat").value;
    if (expense == 0 || expense < 0) {
      alert("Expense Field is empty or has a negative value!");
    } else {
      if (balance - expense < 0) {
        alert("You have gone over your budget!");
      } else {
        balance = balance - expense;
        $(".balanceText").empty();
        $(".balanceText").append("$");
        $(".balanceText").append(balance);

        $(".expenseItems").append(
          "$" + expense + "-[" + category + "]" + "<br>"
        );

        if (category == "Entertainment") {
          catData[0] = catData[0] + Number(expense);
        } else if (category == "Food & Beverages") {
          catData[1] = catData[1] + Number(expense);
        } else if (category == "Transportation") {
          catData[2] = catData[2] + Number(expense);
        } else if (category == "Bills & Utilities") {
          catData[3] = catData[3] + Number(expense);
        } else if (category == "Savings") {
          catData[4] = catData[4] + Number(expense);
        } else if (category == "Others") {
          catData[5] = catData[5] + Number(expense);
        }

        chart1.update();

        noClick = noClick + 1;
      }
    }
  }
}

function clearList() {
  original = document.getElementById("budget").innerHTML;
  original = original.replace(/\D/g, "");
  if (original == 0 || original < 0) {
    alert("There is nothing to clear!");
  } else {
    $(".balanceText").empty();
    $(".expenseItems").empty();
    $(".balanceText").append("$");
    $(".balanceText").append(original);
    catData = [0, 0, 0, 0, 0, 0];
    chart1.destroy();
    generateCat();
    noClick = 0;
  }
}

function generateCat() {
  var ctx = document.getElementById("pieExpense").getContext("2d");
  chart1 = new Chart(ctx, {
    // Doughnut chart for the categories
    type: "doughnut",
    // The data for our dataset
    data: {
      labels: [
        "Entertainment",
        "Food & Beverages",
        "Transportation",
        "Bills & Utilities",
        "Savings",
        "Others",
      ],
      datasets: [
        {
          label: "Categories",
          backgroundColor: [
            "#5DA5DA",
            "#FAA43A",
            "#F15854",
            "#B276B2",
            "#60BD68",
            "#4D4D4D",
          ],
          data: catData,
        },
      ],
    },
    // Configuration options go here
    options: {
      responsive: true,
    },
  });
}

function saveData() {
  balance = document.getElementById("balance").innerHTML;
  budget = document.getElementById("budget").innerHTML;
  budget = budget.replace(/\D/g, "");
  balance = balance.replace(/\D/g, "");
  month = document.getElementById("monthText").innerHTML;
  var total = 0;
  for (var i = 0; i < catData.length; i++) {
    total += catData[i];
  }
  if (budget == 0 || budget < 0) {
    alert("You cannot save as there is no data!");
  } else if (total == 0) {
    var x = confirm(
      "There is no expense tracked. Are you sure you want to continue?"
    );
    if (x == true) {
      let saveObjectNE = {
        month: document.getElementById("monthText").innerHTML,
        budget: budget,
        balance: balance,
        expense: catData,
        labels: catLabels,
        totalSpent: total,
      };

      saveFile = localStorage.getItem("SaveData");
      saveFile = JSON.parse(saveFile);

      if (saveFile !== null) {
        saveFile.push(saveObjectNE);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      } else {
        saveFile = [];
        saveFile.push(saveObjectNE);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      }

      document.getElementById("formTop").reset();
      document.getElementById("formBottom").reset();
      clearList();
      $(".monthText").empty();
      $(".budgetText").empty();
      $(".balanceText").empty();
    }
  } else {
    var r = confirm(
      "Clicking OK will save the data. Are you sure you want to continue?"
    );
    if (r == true) {
      let saveObject = {
        month: document.getElementById("monthText").innerHTML,
        budget: budget,
        balance: balance,
        expense: catData,
        labels: catLabels,
        totalSpent: total,
      };

      saveFile = localStorage.getItem("SaveData");
      saveFile = JSON.parse(saveFile);

      if (saveFile !== null) {
        saveFile.push(saveObject);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      } else {
        saveFile = [];
        saveFile.push(saveObject);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      }
      document.getElementById("formTop").reset();
      document.getElementById("formBottom").reset();
      clearList();
      $(".monthText").empty();
      $(".budgetText").empty();
      $(".balanceText").empty();
    }
  }
}

function loadData() {
  loadData = [];
  var retrievedData = localStorage.getItem("SaveData");
  loadData = JSON.parse(retrievedData);

  if (retrievedData !== null) {
    if (loadData.length == 0) {
      alert("There is no save data!");
    } else {
      noClick = 1;
      $(".loadAlert").show();
      $(".saveChange").show();
      $(".saveEL").hide();
      $(".loadEL").hide();

      $(".balanceText").empty();
      $(".balanceText").append("$");
      $(".balanceText").append(loadData[saveNo].balance);

      $(".budgetText").empty();
      $(".budgetText").append("$");
      $(".budgetText").append(loadData[saveNo].budget);

      $(".monthText").empty();
      $(".monthText").append(loadData[saveNo].month);

      $(".expenseItems").empty();
      for (var i = 0; i < loadData[saveNo].expense.length; i++) {
        if (loadData[saveNo].expense[i] == 0) {
          continue;
        }
        $(".expenseItems").append(
          "$" +
            loadData[saveNo].expense[i] +
            "-[" +
            loadData[saveNo].labels[i] +
            "]" +
            "<br>"
        );
      }

      catData = loadData[saveNo].expense;
      generateCat();
    }
  } else {
    alert("There is no save data!");
  }
}

function delData() {
  var r = confirm(
    "Clicking OK will clear all data saved. Are you sure you want to continue?"
  );
  if (r == true) {
    localStorage.clear();
    loadData = [];
    saveData = [];
    clearList();
    $(".monthText").empty();
    $(".budgetText").empty();
    $(".balanceText").empty();
    $(".loadAlert").hide();
    $(".saveChange").hide();
    $(".saveEL").show();
    $(".loadEL").show();
    document.getElementById("formTop").reset();
    document.getElementById("formBottom").reset();
  }
}

function saveChanges() {
  balance = document.getElementById("balance").innerHTML;
  budget = document.getElementById("budget").innerHTML;
  budget = budget.replace(/\D/g, "");
  balance = balance.replace(/\D/g, "");
  month = document.getElementById("monthText").innerHTML;
  var total = 0;
  for (var i = 0; i < catData.length; i++) {
    total += catData[i];
  }
  if (budget == 0 || budget < 0) {
    alert("You cannot save as there is no data!");
  } else if (total == 0) {
    var x = confirm(
      "There is no expense tracked. Are you sure you want to continue?"
    );
    if (x == true) {
      let saveObjectNE = {
        month: document.getElementById("monthText").innerHTML,
        budget: budget,
        balance: balance,
        expense: catData,
        labels: catLabels,
        totalSpent: total,
      };

      saveFile = localStorage.getItem("SaveData");
      saveFile = JSON.parse(saveFile);
      saveFile.splice(saveNo, 1);

      if (saveFile !== null) {
        saveFile.push(saveObjectNE);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      } else {
        saveFile = [];
        saveFile.push(saveObjectNE);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      }

      document.getElementById("formTop").reset();
      document.getElementById("formBottom").reset();
      clearList();
      $(".monthText").empty();
      $(".budgetText").empty();
      $(".balanceText").empty();
      $(".saveChange").hide();
      $(".saveEL").show();
      $(".loadEL").show();
    }
  } else {
    var r = confirm(
      "Clicking OK will save the data. Are you sure you want to continue?"
    );
    if (r == true) {
      let saveObject = {
        month: document.getElementById("monthText").innerHTML,
        budget: budget,
        balance: balance,
        expense: catData,
        labels: catLabels,
        totalSpent: total,
      };

      saveFile = localStorage.getItem("SaveData");
      saveFile = JSON.parse(saveFile);
      saveFile.splice(saveNo, 1);

      if (saveFile !== null) {
        saveFile.push(saveObject);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      } else {
        saveFile = [];
        saveFile.push(saveObject);
        localStorage.clear();
        localStorage.setItem("SaveData", JSON.stringify(saveFile));
      }
      document.getElementById("formTop").reset();
      document.getElementById("formBottom").reset();
      clearList();
      $(".monthText").empty();
      $(".budgetText").empty();
      $(".balanceText").empty();
      $(".saveChange").hide();
      $(".saveEL").show();
      $(".loadEL").show();
    }
  }
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
