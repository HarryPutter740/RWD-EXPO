const highlight = document.querySelector(".highlight p");

const data = getData();

if (highlight) {
  highlight.textContent = `${data.totalOrders} orders placed so far.`;
}
