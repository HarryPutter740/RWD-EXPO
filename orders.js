const highlight = document.querySelector(".highlight p");

const data = getData();

// Clear notifications when viewing orders
if (data.unreadOrders > 0) {
  data.unreadOrders = 0;
  setData(data);
  updateOrderBadge();
}

if (highlight) {
  highlight.textContent = `${data.totalOrders} orders placed so far.`;
}
