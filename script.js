// Function to filter tools based on search input
function filterTools() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const categories = document.querySelectorAll(".category");
    const noResultsMessage = document.getElementById("no-results-message");
    let isAnyToolVisible = false;

    categories.forEach((category) => {
        const tools = category.querySelectorAll("ul li");
        let isCategoryVisible = false;

        tools.forEach((tool) => {
            if (tool.textContent.toLowerCase().includes(filter)) {
                tool.style.display = "flex"; // Keep alignment consistent
                isCategoryVisible = true;
                isAnyToolVisible = true;
            } else {
                tool.style.display = "none";
            }
        });

        category.style.display = isCategoryVisible ? "block" : "none";
    });

    // Show or hide the "No Results" message
    if (!isAnyToolVisible) {
        noResultsMessage.classList.remove("hidden");
    } else {
        noResultsMessage.classList.add("hidden");
    }
}

// Function to redirect to a specific URL
function redirectTo(url) {
    window.open(url, "_blank");
}

// Function to populate marked boxes with demo content
function populateBoxes() {
    const content = [
        "Demo Content for Box 1",
        "Demo Content for Box 2",
        "Demo Content for Box 3",
        "Demo Content for Box 4",
    ];

    content.forEach((text, index) => {
        const box = document.getElementById(`box${index + 1}`);
        box.innerText = text;
        box.style.padding = "20px";
        box.style.border = "1px solid #ddd";
        box.style.backgroundColor = "#f8f9fa";
        box.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        box.style.borderRadius = "8px";
    });
}

// Call populateBoxes function on window load
window.onload = populateBoxes;


