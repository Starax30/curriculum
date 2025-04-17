// indexjs.js

document.addEventListener("DOMContentLoaded", function () {
    // --- SIDEBAR FUNCTIONALITEIT ---
    const sidebar      = document.getElementById("sidebar");
    const toggleBtn    = document.getElementById("toggle-sidebar");
    const tooltip      = document.getElementById("tooltip");

    // Pijlindicator maken en toevoegen
    const arrowIndicator = document.createElement("div");
    arrowIndicator.classList.add("arrow-indicator");
    arrowIndicator.innerHTML = "➡️";
    toggleBtn.parentElement.insertBefore(arrowIndicator, toggleBtn);

    // Tooltip voor sidebar-knop
    toggleBtn.addEventListener("mouseenter", () => tooltip.style.display = "block");
    toggleBtn.addEventListener("mouseleave", () => tooltip.style.display = "none");

    // Open/sluit sidebar en verberg/toon pijl
    function toggleSidebar() {
        sidebar.classList.toggle("open");
        arrowIndicator.style.display = sidebar.classList.contains("open") ? "none" : "block";
    }
    toggleBtn.addEventListener("click", toggleSidebar);
    arrowIndicator.addEventListener("click", toggleSidebar);

    // Kort tooltip‑hint bij laden
    tooltip.style.display = "block";
    setTimeout(() => tooltip.style.display = "none", 2000);


    // --- PROGRESS BAR FUNCTIONALITEIT (optioneel) ---
    const slider = document.getElementById("slider");
    if (slider) {
        slider.addEventListener("input", function() {
            const pct = this.value;
            const bar = document.getElementById("progress-bar");
            if (bar) {
                bar.style.width = pct + "%";
                bar.innerText   = pct + "%";
            }
            const text = document.getElementById("percentage");
            if (text) text.innerText = pct + "%";
        });
    }


    // --- CARROUSEL FUNCTIONALITEIT ---
    const track = document.querySelector(".carousel-track");
    if (track) {
        const items = Array.from(track.children);
        const count = items.length;
        const duplicateCount = Math.ceil(100 / count);

        for (let i = 0; i < duplicateCount; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add("cloned"); // voor styling/debug
                track.appendChild(clone);
            });
        }

        track.style.display    = "flex";
        track.style.gap        = "20px";
        track.style.willChange = "transform";

        function updateAnimation() {
            track.style.animation = window.innerWidth <= 600
                ? "scroll 20s linear infinite"
                : "scroll 14s linear infinite";
        }
        updateAnimation();
        window.addEventListener("resize", updateAnimation);

        function resetCarousel() {
            track.style.animation = "none";
            void track.offsetWidth; // force reflow
            track.style.animation = "";
        }
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) resetCarousel();
        });
    }


    // --- HERO-SECTIE RESPONSIEF MAKEN ---
    function updateHero() {
        const hero = document.querySelector(".hero-section");
        if (hero) {
            hero.style.height = window.innerWidth <= 600 ? "40vh" : "60vh";
        }
    }
    window.addEventListener("resize", updateHero);
    updateHero();


    // --- KAART (Leaflet) ---
    if (window.L && document.getElementById("map")) {
        const map = L.map("map").setView([51.17, 4.45], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([51.17, 4.45]).addTo(map);
    }


    // --- TOOLTIP VOOR TABELRIJEN ---
    // Zorg dat in index.html vóór </body> staat: <div id="row-tooltip"></div>
    const rowTooltip = document.getElementById("row-tooltip");
    if (rowTooltip) {
        const rows = document.querySelectorAll(".col-md-6 .table-hover tbody tr");
        rows.forEach(row => {
            row.addEventListener("mouseenter", e => {
                // Kijk eerst of er een custom tooltip is via data-tooltip
                const custom = row.getAttribute("data-tooltip");
                if (custom) {
                    rowTooltip.innerText = custom;
                } else {
                    // Fallback: toon de drie cellen
                    const cells = row.querySelectorAll("td");
                    rowTooltip.innerText = `${cells[0].innerText} – ${cells[1].innerText} – ${cells[2].innerText}`;
                }
                // Positioneer en toon
                rowTooltip.style.left    = (e.clientX + 10) + "px";
                rowTooltip.style.top     = (e.clientY + 10) + "px";
                rowTooltip.style.display = "block";
            });
            row.addEventListener("mousemove", e => {
                rowTooltip.style.left = (e.clientX + 10) + "px";
                rowTooltip.style.top  = (e.clientY + 10) + "px";
            });
            row.addEventListener("mouseleave", () => {
                rowTooltip.style.display = "none";
            });
        });
    }
});
