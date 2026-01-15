const note = document.querySelector(".note");
const welcomeName = document.querySelector(".welcome h2 span");

const data = getData();
const profile = getProfile();

note.textContent =
  data.selectedCoffee === "None"
    ? "Choose a coffee to start the grind."
    : `Last choice: ${data.selectedCoffee} ☕`;

if (welcomeName && profile.name) {
  welcomeName.textContent = profile.name;
}
