const form = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");
const emailInput = document.getElementById("email");
const rememberMe = document.getElementById("rememberMe");
const submitBtn = form.querySelector("button");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

// Toggle Password Visibility
if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "🙈" : "👁️";
  });
}

// Check for saved email
if (localStorage.getItem("savedEmail")) {
  emailInput.value = localStorage.getItem("savedEmail");
  rememberMe.checked = true;
}

// Check for logout action in URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("action") === "logout") {
  messageBox.textContent = "You have been logged out successfully.";
  messageBox.className = "message-box success";
  messageBox.style.display = "block";
  // Clean URL
  window.history.replaceState({}, document.title, "login.html");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset UI
  messageBox.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.textContent = "Brewing...";

  const email = emailInput.value;
  const password = passwordInput.value;

  // Simulate network delay
  setTimeout(() => {
    if (email === "brewer@dailygrind.com" && password === "coffee123") {
      if (rememberMe.checked) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      messageBox.textContent = "Invalid credentials ☕";
      messageBox.className = "message-box error";
      messageBox.style.display = "block";

      const loginCard = document.querySelector(".login-card");
      loginCard.classList.add("shake");
      setTimeout(() => loginCard.classList.remove("shake"), 500);

      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }
  }, 800);
});
