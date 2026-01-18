// AUTH GUARD
if (!localStorage.getItem("isLoggedIn") && !location.pathname.includes("login.html")) {
  window.location.href = "login.html";
}

// Initialize shared data if not present
if (!localStorage.getItem("coffeeData")) {
  localStorage.setItem(
    "coffeeData",
    JSON.stringify({
      selectedCoffee: "None",
      totalOrders: 0,
      beans: 0
    })
  );
}

// Initialize user profile if not present
if (!localStorage.getItem("userProfile")) {
  localStorage.setItem(
    "userProfile",
    JSON.stringify({
      name: "Brewer",
      email: "brewer@dailygrind.com",
      bio: "Caffeine enthusiast.",
      favCoffee: "Latte"
    })
  );
}

// Initialize activity log if not present
if (!localStorage.getItem("activityLog")) {
  localStorage.setItem("activityLog", JSON.stringify([]));
}

// Helper functions
function getData() {
  return JSON.parse(localStorage.getItem("coffeeData"));
}

function setData(data) {
  localStorage.setItem("coffeeData", JSON.stringify(data));
}

function getProfile() {
  return JSON.parse(localStorage.getItem("userProfile"));
}

function setProfile(data) {
  localStorage.setItem("userProfile", JSON.stringify(data));
}

function getActivityLog() {
  return JSON.parse(localStorage.getItem("activityLog")) || [];
}

function logActivity(action) {
  const log = getActivityLog();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  log.unshift({ action, time: timestamp });
  if (log.length > 5) log.pop();
  localStorage.setItem("activityLog", JSON.stringify(log));
}

function updateOrderBadge() {
  const data = getData();
  if (!data) return;
  
  const count = data.unreadOrders || 0;
  const ordersLink = document.querySelector('a[href="orders.html"]');
  
  if (ordersLink) {
    let badge = ordersLink.querySelector(".notification-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "notification-badge";
      ordersLink.appendChild(badge);
    }
    
    if (count > 0) {
      badge.textContent = count;
      badge.classList.add("show");
    } else {
      badge.classList.remove("show");
    }
  }
}

// Theme Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Apply saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    if (toggleBtn) toggleBtn.textContent = "🌙 Dark Mode";
  }

  // Toggle Event
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const isLight = body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      toggleBtn.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
    });
  }

  // Sidebar Toggle Logic
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.querySelector(".sidebar");
  
  // Create Overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Sidebar Resizer Logic
  if (sidebar) {
    // Load saved width
    const savedWidth = localStorage.getItem("sidebarWidth");
    if (savedWidth) {
      document.documentElement.style.setProperty("--sidebar-width", savedWidth);
    }

    const resizer = document.createElement("div");
    resizer.className = "resizer";
    sidebar.appendChild(resizer);

    let isResizing = false;

    resizer.addEventListener("mousedown", (e) => {
      isResizing = true;
      document.body.style.cursor = "col-resize";
      resizer.classList.add("resizing");
      e.preventDefault();
    });

    resizer.addEventListener("dblclick", () => {
      document.documentElement.style.removeProperty("--sidebar-width");
      localStorage.removeItem("sidebarWidth");
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      // Constraints
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 600) newWidth = 600;
      
      document.documentElement.style.setProperty("--sidebar-width", `${newWidth}px`);
    });

    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = "default";
        resizer.classList.remove("resizing");
        const currentWidth = document.documentElement.style.getPropertyValue("--sidebar-width");
        if (currentWidth) localStorage.setItem("sidebarWidth", currentWidth);
      }
    });
  }

  if (menuBtn && sidebar) {
    const toggleMenu = () => {
      const isOpen = sidebar.classList.toggle("open");
      menuBtn.classList.toggle("open", isOpen);
      overlay.classList.toggle("active", isOpen);
      menuBtn.textContent = isOpen ? "←" : "☰";
    };
    menuBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    // Keyboard Shortcut (Ctrl+B)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Check for horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const isOpen = sidebar.classList.contains("open");
        // Swipe Right to Open (must start near left edge)
        if (diffX > 0 && touchStartX < 40 && !isOpen) toggleMenu();
        // Swipe Left to Close
        if (diffX < 0 && isOpen) toggleMenu();
      }
    }, {passive: true});
  }

  // Sidebar Search Logic
  const searchInput = document.getElementById("sidebarSearch");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      navLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(term) ? "block" : "none";
      });
    });
  }

  // Initialize Badge
  updateOrderBadge();
});
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html?action=logout";
}
