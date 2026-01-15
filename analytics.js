const data = getData();

// Elements
const adminBtn = document.getElementById("adminBtn");
const resetBtn = document.getElementById("resetBtn");
const adminSections = document.querySelectorAll(".admin-only");

const ordersEl = document.getElementById("totalOrders");
const beansEl = document.getElementById("totalBeans");
const coffeeEl = document.getElementById("lastCoffee");
const dailyUsageEl = document.getElementById("dailyUsage");

// Populate stats
ordersEl.textContent = data.totalOrders;
beansEl.textContent = `${data.beans} ☕`;
coffeeEl.textContent = data.selectedCoffee;

// ADMIN MODE (fake but convincing)
adminBtn.addEventListener("click", () => {
  const pass = prompt("Enter admin password");

  if (pass === "admin123") {
    adminSections.forEach(sec => sec.style.display = "block");
    adminBtn.style.display = "none";
  } else {
    alert("Access denied.");
  }
});

// RESET ANALYTICS
resetBtn.addEventListener("click", () => {
  if (confirm("Reset all analytics data?")) {
    localStorage.removeItem("coffeeData");
    location.reload();
  }
});

// BAR CHART DATA (simulated weekly usage)
const bars = document.querySelectorAll(".bar");
bars.forEach(bar => {
  const value = Math.floor(Math.random() * 120) + 40;
  bar.style.setProperty("--h", `${value}px`);
});

// DAILY USAGE SIMULATION
const todayOrders = Math.floor(Math.random() * 15) + 1;
dailyUsageEl.textContent = `Estimated orders today: ${todayOrders}`;
