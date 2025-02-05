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

    // Sidebar openen/sluiten bij klikken
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");

        // Verberg de pijl wanneer de sidebar wordt geopend
        if (sidebar.classList.contains("open")) {
            arrowIndicator.style.display = "none";
        } else {
            arrowIndicator.style.display = "block";
        }
    });

    // Tooltip tonen bij het laden van de pagina voor 2 seconden
    tooltip.style.display = "block";
    setTimeout(() => {
        tooltip.style.display = "none";
    }, 2000);
});
