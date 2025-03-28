let budgetManager = {
  totalIncome: 0,
  totalExpense: 0,
  budget: 0,

  setBudget: function () {
    this.budget = parseFloat(document.getElementById("budget").value) || 0;

    if (this.budget === 0) {
      alert("The initial budget cannot be zero, Please enter og amount.");
    } else {
      document.getElementById("initial-budget").innerText =
        this.budget.toFixed(2);
      this.updateBalance();
    }
  },

  addTransaction: function () {
    let user = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.querySelector('input[name="type"]:checked')?.value;

    if (!user || !category || !amount || !type) {
      alert("Please fill all fields");
      return;
    }

    let tableBody = document.getElementById("transaction-body");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${user}</td>
                       <td>${category}</td>
                       <td>${type}</td>
                       <td>${amount.toFixed(2)}</td>`;
    tableBody.appendChild(row);

    if (type === "income") {
      this.totalIncome += amount;
      document.getElementById("income-input").value =
        this.totalIncome.toFixed(2);
    } else {
      this.totalExpense += amount;
      this.budget -= amount;
      document.getElementById("expense-input").value =
        this.totalExpense.toFixed(2);
      document.getElementById("initial-budget").innerText =
        this.budget.toFixed(2);
    }

    this.updateBalance();
  },

  updateBalance: function () {
    let balance = this.totalIncome - this.totalExpense - this.budget;
    document.getElementById("balance").textContent = balance.toFixed(2);
  },
};

document.getElementById("setBudgetBtn").addEventListener("click", function () {
  budgetManager.setBudget();
});
