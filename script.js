// Dark mode toggle functionality
function toggleDarkMode() {
    const body = document.body;
    const currentMode = body.classList.contains("dark-mode");
    
    if (currentMode) {
        body.classList.remove("dark-mode");
        localStorage.setItem("mode", "light");
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("mode", "dark");
    }
}

// On page load, check the stored mode preference
document.addEventListener("DOMContentLoaded", function() {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
