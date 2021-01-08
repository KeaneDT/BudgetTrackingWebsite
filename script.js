$(".topSubmit").click(topSubmit)
$(".bottomSubmit").click(addExpense)
$(".clearEL").click(clearList)

var noClick = 0;

function topSubmit() {
    month = document.getElementById("monthInput").value;
    budget = document.getElementById("budgetInput").value;
    budget = budget.replace(/\D/g,'');

    if (month==0) {
        alert("Month Field is empty!")
    } else if (budget==0 || budget<0) {
        alert("Budget Field is empty or has a negative value!")
    } else {
        
        if (noClick>0) {
            var r = confirm("Clicking OK will clear Expense List. Are you sure you want to continue?")
            if (r==true) {
                $(".expenseItems").empty();
                $(".budgetText").empty();
                $(".budgetText").append("$");
                $(".budgetText").append(budget);
                $(".balanceText").empty();
                $(".balanceText").append("$");
                $(".balanceText").append(budget);
                noClick = 0;
            }
        } else {
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

    if (balance<=0) {
        alert("Balance is less than or equal to 0!")
    } else {
        expense = document.getElementById("expenseInput").value;
        category = document.getElementById("expenseCat").value;
        if (expense==0 || expense<0) {
            alert("Expense Field is empty or has a negative value!")
        } else {

            if (balance-expense<0) {
                alert("You have gone over your budget!")
            } else {
                balance = balance - expense;
                $(".balanceText").empty();
                $(".balanceText").append("$");
                $(".balanceText").append(balance);
    
                $(".expenseItems").append("$" + expense + "[" + category + "]" + "<br>");

                noClick = noClick + 1;
            }
        }
    }
}

function clearList() {
    original = document.getElementById("budget").innerHTML;
    original = original.replace(/\D/g,'');
    if (original==0||original<0) {
        alert("There is nothing to clear!");
    } else {
        $(".balanceText").empty();
        $(".expenseItems").empty();
        $(".balanceText").append("$");
        $(".balanceText").append(original);
        noClick = 0;
    }
}