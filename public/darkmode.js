document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.createElement("button");
    toggleButton.id = "theme-toggle";
    toggleButton.style.position = "fixed";
    toggleButton.style.top = "10px";
    toggleButton.style.right = "10px";
    toggleButton.style.padding = "10px 15px";
    toggleButton.style.border = "none";
    toggleButton.style.background = "gray";
    toggleButton.style.color = "white";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.borderRadius = "5px";
    toggleButton.style.fontSize = "14px";

    document.body.appendChild(toggleButton);

    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    }

    // Check localStorage for dark mode preference
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    applyDarkMode(isDarkMode);

    toggleButton.addEventListener("click", () => {
        const isNowDark = !document.body.classList.contains("dark-mode");
        applyDarkMode(isNowDark);
        localStorage.setItem("darkMode", isNowDark ? "enabled" : "disabled");
    });
});
