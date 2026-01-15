const cards = document.querySelectorAll(".small");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const coffeeName = card.querySelector("h4").textContent;

    let data = getData();
    data.selectedCoffee = coffeeName;
    data.totalOrders += 1;
    data.beans += 5;

    setData(data);

    card.style.border = "2px solid #c58b59";
    card.style.boxShadow = "0 12px 30px rgba(197,139,89,0.3)";
  });
});
