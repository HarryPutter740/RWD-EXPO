const beanText = document.querySelector(".small p");
const nextReward = document.querySelector(".highlight p");

const data = getData();

beanText.textContent = `${data.beans} ☕`;

if (data.beans >= 50) {
  nextReward.textContent = "Free drink unlocked 🎉";
} else {
  nextReward.textContent = `${50 - data.beans} beans to next reward`;
}
