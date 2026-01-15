// Initialize shared data if not present
if (!localStorage.getItem("coffeeData")) {
  localStorage.setItem(
    "coffeeData",
    JSON.stringify({
      selectedCoffee: "None",
      totalOrders: 0,
      beans: 0
    })
  );
}

// Helper functions
function getData() {
  return JSON.parse(localStorage.getItem("coffeeData"));
}

function setData(data) {
  localStorage.setItem("coffeeData", JSON.stringify(data));
}
