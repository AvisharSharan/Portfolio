const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Function to apply the theme
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark-mode");
    themeIcon.src = "static/icons/moon.svg";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark-mode");
    themeIcon.src = "static/icons/sun.svg";
    localStorage.setItem("theme", "light");
  }
}

// Check user preference in localStorage or system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains("dark-mode");
  applyTheme(isDark);
});
