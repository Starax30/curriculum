document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");
    const tooltip = document.getElementById("tooltip");
    const arrowIndicator = document.createElement("div"); // Maak een pijl aan

    // Voeg de pijl toe aan de pagina
    arrowIndicator.classList.add("arrow-indicator");
    arrowIndicator.innerHTML = "➡️";
    toggleBtn.parentElement.insertBefore(arrowIndicator, toggleBtn);

    // Tooltip weergeven bij hover
    toggleBtn.addEventListener("mouseenter", function () {
        tooltip.style.display = "block";
    });

    // Tooltip verbergen als de muis weggaat
    toggleBtn.addEventListener("mouseleave", function () {
        tooltip.style.display = "none";
    });

    // Sidebar openen/sluiten bij klikken op de knop of de pijl
    function toggleSidebar() {
        sidebar.classList.toggle("open");

        // Verberg de pijl wanneer de sidebar wordt geopend
        if (sidebar.classList.contains("open")) {
            arrowIndicator.style.display = "none";
        } else {
            arrowIndicator.style.display = "block";
        }
    }

    toggleBtn.addEventListener("click", toggleSidebar);
    arrowIndicator.addEventListener("click", toggleSidebar); // Maak de pijl ook klikbaar

    // Tooltip tonen bij het laden van de pagina voor 2 seconden
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
