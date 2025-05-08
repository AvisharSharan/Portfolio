const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const currentYearSpan = document.getElementById("currentYear");

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

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });
});

// Set current year in footer
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links & active link highlighting
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if(targetElement){
            // Calculate position considering the fixed header
            const headerOffset = 70; // Height of the fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Update active link (optional, if you want to highlight on click)
            document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;
  const headerOffset = 80; // A bit more offset for highlighting

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerOffset;
    let sectionId = current.getAttribute("id");

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
    }
  });

  // Highlight first link if at top of page
  if (scrollY < sections[0].offsetTop - headerOffset) {
    document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove('active'));
    const firstLink = document.querySelector(".nav-links a[href*=" + sections[0].id + "]");
    if (firstLink) firstLink.classList.add("active");
  }
}
