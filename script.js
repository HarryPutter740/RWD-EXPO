// Coffee moods because emotions need caffeine too
const coffeeVibes = [
  {
    mood: "Calm & Cozy",
    message: "Soft rain energy. A slow sip kind of day.",
    popular: "Latte",
    cups: 8
  },
  {
    mood: "Highly Caffeinated",
    message: "Fast thoughts. Loud playlists. No fear.",
    popular: "Cold Brew",
    cups: 12
  },
  {
    mood: "Midnight Warrior",
    message: "The city sleeps. You don’t.",
    popular: "Dark Roast",
    cups: 15
  },
  {
    mood: "Creative Buzz",
    message: "Ideas spilling like espresso shots.",
    popular: "Cappuccino",
    cups: 10
  }
];

// DOM Elements
const vibeBtn = document.querySelector(".secondary");
const statsCard = document.querySelector(".stats");
const hydrationBtn = document.querySelector(".tag");

// Coffee Vibe Button
vibeBtn.addEventListener("click", () => {
  const vibe = coffeeVibes[Math.floor(Math.random() * coffeeVibes.length)];

  statsCard.innerHTML = `
    <h3>Today’s Brew Stats</h3>
    <p>Cups brewed: <strong>${vibe.cups}</strong></p>
    <p>Most popular: <strong>${vibe.popular}</strong></p>
    <p>Mood: <strong>${vibe.mood}</strong></p>
    <div class="progress"></div>
    <p class="note">${vibe.message}</p>
  `;
});

// Hydration Reminder
hydrationBtn.addEventListener("click", () => {
  alert("Water exists. Please acknowledge it.");
});

// Soft greeting based on time
const hour = new Date().getHours();
const note = document.querySelector(".note");

if (hour < 12) {
  note.textContent = "Morning grind. Start slow, sip steady.";
} else if (hour < 18) {
  note.textContent = "Afternoon haze. Coffee knows the way.";
} else {
  note.textContent = "Evening calm. Let the cup warm your thoughts.";
}
