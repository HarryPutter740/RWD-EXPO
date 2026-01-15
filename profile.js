// Elements
const form = document.getElementById("profileForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const bioInput = document.getElementById("bioInput");
const favCoffeeInput = document.getElementById("favCoffeeInput");

const displayNames = document.querySelectorAll("#profileNameDisplay");
const displayBio = document.getElementById("profileBioDisplay");
const displayEmail = document.getElementById("profileEmailDisplay");

// Load Data
function loadProfile() {
  const profile = getProfile();
  
  // Fill Form
  nameInput.value = profile.name;
  emailInput.value = profile.email;
  bioInput.value = profile.bio;
  favCoffeeInput.value = profile.favCoffee;

  // Update Preview
  displayNames.forEach(el => el.textContent = profile.name);
  if (displayBio) displayBio.textContent = profile.bio;
  if (displayEmail) displayEmail.textContent = profile.email;

  renderActivityLog();
}

function renderActivityLog() {
  const log = getActivityLog();
  const list = document.getElementById("activityList");
  if (!list) return;
  
  list.innerHTML = log.length ? log.map(item => `
    <li style="padding: 0.8rem 0; border-bottom: 1px solid var(--border-sidebar); display: flex; justify-content: space-between;">
      <span>${item.action}</span>
      <span style="color: var(--text-muted); font-size: 0.8rem;">${item.time}</span>
    </li>
  `).join("") : `<li style="color: var(--text-muted); padding: 0.5rem 0;">No recent activity recorded.</li>`;
}

// Save Data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedProfile = {
    name: nameInput.value,
    email: emailInput.value,
    bio: bioInput.value,
    favCoffee: favCoffeeInput.value
  };

  setProfile(updatedProfile);
  loadProfile();
  logActivity("Updated profile details");
  alert("Profile updated successfully! ☕");
});

// Initialize
loadProfile();