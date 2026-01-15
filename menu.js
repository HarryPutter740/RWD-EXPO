const cards = document.querySelectorAll(".small");
const orderSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const coffeeName = card.querySelector("h4").textContent;

    let data = getData();
    data.selectedCoffee = coffeeName;
    data.totalOrders += 1;
    data.beans += 5;
    data.unreadOrders = (data.unreadOrders || 0) + 1;

    setData(data);
    updateOrderBadge();
    logActivity(`Ordered ${coffeeName}`);

    orderSound.currentTime = 0;
    orderSound.play().catch(e => console.warn("Audio play failed:", e));

    card.style.border = "2px solid #c58b59";
    card.style.boxShadow = "0 12px 30px rgba(197,139,89,0.3)";
  });
});
