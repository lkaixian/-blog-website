document.addEventListener("DOMContentLoaded", function () {
    fetch("data/projects.json")
        .then(response => response.json())
        .then(data => {
            renderProjects(data);
        })
        .catch(error => console.error("Error loading projects:", error));

    function renderProjects(projects) {
        const projectsContainer = document.getElementById("projects-list");
        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project-card"); // Use CSS class for styling

            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3><a href="#" class="project-link" data-id="${project.id}">${project.title}</a></h3>
                    <p>${project.description}</p>
                    <span class="project-date">${project.date}</span>
                </div>
            `;

            projectsContainer.appendChild(projectElement);
        });

        // Handle click event for project links
        document.querySelectorAll(".project-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const projectId = this.dataset.id;
                loadProjectPage(projectId);
            });
        });
    }

    function loadProjectPage(projectId) {
        history.pushState({ project: projectId }, "", `/projects/${projectId}`);
        fetch("data/projects.json")
            .then(response => response.json())
            .then(projects => {
                const project = projects.find(p => p.id === projectId);
                if (project) {
                    document.getElementById("content").innerHTML = `
                        <button id="back-to-projects">← Back to Projects</button>
                        <h1>${project.title}</h1>
                        <img src="${project.image}" alt="${project.title}" class="project-image">
                        <p>${project.description}</p>
                        <span class="project-date">${project.date}</span>
                    `;

                    document.getElementById("back-to-projects").addEventListener("click", function () {
                        history.pushState({}, "", "/projects");
                        location.reload();
                    });
                }
            });
    }

    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.project) {
            loadProjectPage(event.state.project);
        } else {
            location.reload();
        }
    });
});
