const note = document.querySelector(".note");

const data = getData();

note.textContent =
  data.selectedCoffee === "None"
    ? "Choose a coffee to start the grind."
    : `Last choice: ${data.selectedCoffee} ☕`;

