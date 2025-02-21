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



document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector(".carousel-track");
    const items = Array.from(track.children);
    
    // Dupliceer de items voor een vloeiende scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    
    track.style.display = "flex";
    track.style.gap = "20px";
    track.style.willChange = "transform";
    track.style.animation = "scroll 14s linear infinite";

    function updateAnimationSpeed() {
        if (window.innerWidth <= 600) {
            track.style.animation = "scroll 20s linear infinite";
        } else {
            track.style.animation = "scroll 14s linear infinite";
        }
    }

    window.addEventListener("resize", updateAnimationSpeed);
    updateAnimationSpeed(); // Initial call

    // Pas de hero-sectie aan voor kleinere schermen
    function updateHeroSection() {
        const heroSection = document.querySelector(".hero-section");
        if (window.innerWidth <= 600) {
            heroSection.style.height = "40vh"; // Maak de hero-sectie kleiner
        } else {
            heroSection.style.height = "60vh";
        }
    }

    window.addEventListener("resize", updateHeroSection);
    updateHeroSection(); // Initial call
});
