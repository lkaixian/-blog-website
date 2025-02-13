document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.getElementById("content-container");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (!themeToggle){
    	console.error("Dark mode toggle button not found!");
	return;
    }

    function updateButtonText(){
        themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
    // Check if dark mode is enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }
    
    updateButtonText();

    // Toggle dark mode
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
	updateButtonText();
    });

    // Function to load page dynamically
    function loadPage(event, page) {
        if (event) event.preventDefault(); // Prevent full refresh

        fetch(page + ".html")
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
                history.pushState({ page: page }, "", "/" + page);
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Handle refresh (load correct page)
    function handlePageLoad() {
        let path = window.location.pathname.replace("/", "") || "home"; // Default to home
        fetch(path + ".html")
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Handle browser back/forward
    window.onpopstate = function (event) {
        if (event.state && event.state.page) {
            fetch(event.state.page + ".html")
                .then(response => response.text())
                .then(html => {
                    contentContainer.innerHTML = html;
                });
        } else {
            handlePageLoad();
        }
    };

    // Load content on page load
    handlePageLoad();

    // Make function global
    window.loadPage = loadPage;
});
