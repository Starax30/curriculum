document.addEventListener("DOMContentLoaded", function () {
    /* --- SIDEBAR FUNCTIONALITEIT --- */
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");
    const tooltip = document.getElementById("tooltip");

    // Pijlindicator maken en toevoegen
    const arrowIndicator = document.createElement("div");
    arrowIndicator.classList.add("arrow-indicator");
    arrowIndicator.innerHTML = "➡️";
    toggleBtn.parentElement.insertBefore(arrowIndicator, toggleBtn);

    // Tooltip tonen en verbergen
    toggleBtn.addEventListener("mouseenter", () => tooltip.style.display = "block");
    toggleBtn.addEventListener("mouseleave", () => tooltip.style.display = "none");

    // Sidebar openen/sluiten
    function toggleSidebar() {
        sidebar.classList.toggle("open");
        arrowIndicator.style.display = sidebar.classList.contains("open") ? "none" : "block";
    }

    toggleBtn.addEventListener("click", toggleSidebar);
    arrowIndicator.addEventListener("click", toggleSidebar);

    // Tooltip tijdelijk tonen bij laden
    tooltip.style.display = "block";
    setTimeout(() => tooltip.style.display = "none", 2000);

    /* --- PROGRESS BAR FUNCTIONALITEIT --- */
    document.getElementById("slider").addEventListener("input", function () {
        let percentage = this.value;
        let progressBar = document.getElementById("progress-bar");

        progressBar.style.width = percentage + "%";
        progressBar.innerText = percentage + "%";
        document.getElementById("percentage").innerText = percentage + "%";
    });

    /* --- CARROUSEL FUNCTIONALITEIT --- */
    const track = document.querySelector(".carousel-track");
    const items = Array.from(track.children);
    const totalItems = items.length;
    
    // Minimaal 2x dupliceren om vloeiende overgang te garanderen
    const duplicateCount = Math.ceil(100 / totalItems);

    for (let i = 0; i < duplicateCount; i++) {
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add("cloned"); // Voor debugging of styling
            track.appendChild(clone);
        });
    }

    track.style.display = "flex";
    track.style.gap = "20px";
    track.style.willChange = "transform";
    updateAnimationSpeed();

    function updateAnimationSpeed() {
        track.style.animation = window.innerWidth <= 600 ? "scroll 20s linear infinite" : "scroll 14s linear infinite";
    }

    window.addEventListener("resize", updateAnimationSpeed);

    // Reset animatie om vloeiende loop te behouden
    function resetCarousel() {
        track.style.animation = "none";
        void track.offsetWidth; // Force reflow
        track.style.animation = "";
    }

    // Herstart de animatie als de gebruiker de tab verlaat en terugkomt
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            resetCarousel();
        }
    });

    /* --- HERO-SECTIE RESPONSIEF MAKEN --- */
    function updateHeroSection() {
        document.querySelector(".hero-section").style.height = window.innerWidth <= 600 ? "40vh" : "60vh";
    }

    window.addEventListener("resize", updateHeroSection);
    updateHeroSection(); // Initialisatie
});


document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const items = Array.from(track.children);
    const totalItems = items.length;
    
    // Hoe vaak dupliceren? Minimaal 2x om vloeiende overgang te garanderen
    const duplicateCount = Math.ceil(100 / totalItems); // Zorgt ervoor dat er genoeg items zijn voor continue scrolling

    // Dupliceer de items
    for (let i = 0; i < duplicateCount; i++) {
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add("cloned"); // Voeg een klasse toe voor debugging of styling
            track.appendChild(clone);
        });
    }

    // Reset animatie om vloeiende loop te behouden
    function resetCarousel() {
        track.style.animation = "none";
        void track.offsetWidth; // Force reflow
        track.style.animation = "";
    }

    // Herstart de animatie als de gebruiker de tab verlaat en terugkomt
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            resetCarousel();
        }
    });
});
