document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");
    const tooltip = document.getElementById("tooltip");
    const arrowIndicator = document.createElement("div");

    arrowIndicator.classList.add("arrow-indicator");
    arrowIndicator.innerHTML = "➡️";
    toggleBtn.parentElement.insertBefore(arrowIndicator, toggleBtn);

    toggleBtn.addEventListener("mouseenter", function () {
        tooltip.style.display = "block";
    });

    toggleBtn.addEventListener("mouseleave", function () {
        tooltip.style.display = "none";
    });

    function toggleSidebar() {
        sidebar.classList.toggle("open");

        if (sidebar.classList.contains("open")) {
            arrowIndicator.style.display = "none";
        } else {
            arrowIndicator.style.display = "block";
        }
    }

    toggleBtn.addEventListener("click", toggleSidebar);
    arrowIndicator.addEventListener("click", toggleSidebar);

    tooltip.style.display = "block";
    setTimeout(() => {
        tooltip.style.display = "none";
    }, 2000);
});


function updateProgress() {
    let slider = document.getElementById("slider");
    let percentage = slider.value;
    let progressBar = document.getElementById("progress-bar");
    
    progressBar.style.width = percentage + "%";
    progressBar.innerText = percentage + "%";
    document.getElementById("percentage").innerText = percentage + "%";
}
