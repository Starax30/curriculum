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
(() => {
  "use strict";

  // Elke rij: oorspronkelijke tekst, English, Deutsch, Français, Português.
  // Nederlands gebruikt de oorspronkelijke tekst, met enkele knoplabels hieronder.
  const translationRows = [
  [
    "Curriculum",
    "Curriculum vitae",
    "Lebenslauf",
    "Curriculum vitæ",
    "Currículo"
  ],
  [
    "Werkervaring",
    "Work experience",
    "Berufserfahrung",
    "Expérience professionnelle",
    "Experiência profissional"
  ],
  [
    "Functie",
    "Position",
    "Tätigkeit",
    "Poste",
    "Função"
  ],
  [
    "Locatie",
    "Location",
    "Ort",
    "Lieu",
    "Local"
  ],
  [
    "Periode",
    "Period",
    "Zeitraum",
    "Période",
    "Período"
  ],
  [
    "Hulgerode (vrijwilliger)",
    "Hulgerode (volunteer)",
    "Hulgerode (ehrenamtlich)",
    "Hulgerode (bénévole)",
    "Hulgerode (voluntário)"
  ],
  [
    "Metro Cash and Carry (student)",
    "Metro Cash and Carry (student job)",
    "Metro Cash and Carry (Studentenjob)",
    "Metro Cash and Carry (job étudiant)",
    "Metro Cash and Carry (trabalho de estudante)"
  ],
  [
    "High-street (student)",
    "High-street (student job)",
    "High-street (Studentenjob)",
    "High-street (job étudiant)",
    "High-street (trabalho de estudante)"
  ],
  [
    "Zora werkt (vrijwilliger)",
    "Zora werkt (volunteer)",
    "Zora werkt (ehrenamtlich)",
    "Zora werkt (bénévole)",
    "Zora werkt (voluntário)"
  ],
  [
    "Vrijetijd",
    "Spare time",
    "Freizeit",
    "Temps libre",
    "Tempo livre"
  ],
  [
    "heden",
    "present",
    "heute",
    "à ce jour",
    "atualidade"
  ],
  [
    "Opleidingen",
    "Education",
    "Ausbildung",
    "Formations",
    "Formação académica"
  ],
  [
    "Opleiding",
    "Programme",
    "Ausbildung",
    "Formation",
    "Curso"
  ],
  [
    "Goudsmeden",
    "Goldsmithing",
    "Goldschmiedekunst",
    "Orfèvrerie",
    "Ourivesaria"
  ],
  [
    "Edelsteen zetten",
    "Gemstone setting",
    "Edelsteinfassen",
    "Sertissage de pierres précieuses",
    "Cravação de pedras preciosas"
  ],
  [
    "Front-end programmeren",
    "Front-end development",
    "Frontend-Entwicklung",
    "Développement front-end",
    "Programação front-end"
  ],
  [
    "Computeroperator",
    "Computer operator",
    "Computeroperator",
    "Opérateur informatique",
    "Operador de informática"
  ],
  [
    "Systeem & netwerkbeheer",
    "Systems and network administration",
    "System- und Netzwerkadministration",
    "Administration systèmes et réseaux",
    "Administração de sistemas e redes"
  ],
  [
    "On the side cursussen",
    "Additional courses",
    "Zusätzliche Kurse",
    "Formations complémentaires",
    "Formações complementares"
  ],
  [
    "Opleiding/vorming",
    "Course/training",
    "Kurs/Weiterbildung",
    "Cours/formation",
    "Curso/formação"
  ],
  [
    "Voedselveiligheid (HACCP)",
    "Food safety (HACCP)",
    "Lebensmittelsicherheit (HACCP)",
    "Sécurité alimentaire (HACCP)",
    "Segurança alimentar (HACCP)"
  ],
  [
    "Bedrijfsbeheer",
    "Business management",
    "Unternehmensführung",
    "Gestion d’entreprise",
    "Gestão empresarial"
  ],
  [
    "Leermeester",
    "Workplace trainer",
    "Betrieblicher Ausbilder",
    "Tuteur en entreprise",
    "Formador em contexto de trabalho"
  ],
  [
    "Financieel beleid",
    "Financial management",
    "Finanzmanagement",
    "Gestion financière",
    "Gestão financeira"
  ],
  [
    "Personalia",
    "Personal profile",
    "Persönliches Profil",
    "Profil personnel",
    "Perfil pessoal"
  ],
  [
    "Over",
    "About",
    "Über mich",
    "À propos",
    "Sobre mim"
  ],
  [
    "Man",
    "Male",
    "Männlich",
    "Homme",
    "Masculino"
  ],
  [
    "15-07-1993 te Wilrijk",
    "15 July 1993 in Wilrijk",
    "15.07.1993 in Wilrijk",
    "15 juillet 1993 à Wilrijk",
    "15 de julho de 1993 em Wilrijk"
  ],
  [
    "België",
    "Belgium",
    "Belgien",
    "Belgique",
    "Bélgica"
  ],
  [
    "Rijbewijs B",
    "Category B driving licence",
    "Führerschein Klasse B",
    "Permis de conduire B",
    "Carta de condução da categoria B"
  ],
  [
    "Hobby's",
    "Hobbies",
    "Hobbys",
    "Loisirs",
    "Passatempos"
  ],
  [
    "Fitness en zwemmen",
    "Fitness and swimming",
    "Fitness und Schwimmen",
    "Fitness et natation",
    "Fitness e natação"
  ],
  [
    "Piano",
    "Piano",
    "Klavier",
    "Piano",
    "Piano"
  ],
  [
    "Lezen (Favoriete boeken ⬇)",
    "Reading (favourite books ⬇)",
    "Lesen (Lieblingsbücher ⬇)",
    "Lecture (livres préférés ⬇)",
    "Leitura (livros favoritos ⬇)"
  ],
  [
    "Reizen",
    "Travel",
    "Reisen",
    "Voyages",
    "Viajar"
  ],
  [
    "Contact",
    "Contact",
    "Kontakt",
    "Contact",
    "Contacto"
  ],
  [
    "U kan mij contacteren door op één van onderstaande knoppen te drukken of het contactforum in te vullen en dan neem ik zo spoedig mogelijk contact met u op.",
    "You can contact me using one of the buttons below or by filling in the contact form. I will get back to you as soon as possible.",
    "Sie können mich über eine der folgenden Schaltflächen kontaktieren oder das Kontaktformular ausfüllen. Ich melde mich so schnell wie möglich bei Ihnen.",
    "Vous pouvez me contacter à l’aide des boutons ci-dessous ou en remplissant le formulaire de contact. Je vous répondrai dès que possible.",
    "Pode contactar-me através de um dos botões abaixo ou preencher o formulário de contacto. Responderei o mais brevemente possível."
  ],
  [
    "Phone",
    "Phone",
    "Telefon",
    "Téléphone",
    "Telefone"
  ],
  [
    "Mail",
    "Email",
    "E-Mail",
    "E-mail",
    "E-mail"
  ],
  [
    "Contactform",
    "Contact form",
    "Kontaktformular",
    "Formulaire de contact",
    "Formulário de contacto"
  ],
  [
    "Projectpagina",
    "Project page",
    "Projektseite",
    "Page du projet",
    "Página do projeto"
  ],
  [
    "Favoriete boeken en behaalde Certificaten/Diploma's",
    "Favourite books and certificates/diplomas obtained",
    "Lieblingsbücher und erworbene Zertifikate/Abschlüsse",
    "Livres préférés et certificats/diplômes obtenus",
    "Livros favoritos e certificados/diplomas obtidos"
  ],
  [
    "Het boek benadrukt hoe efficiëntere workflows, automatisering en samenwerking kunnen helpen om sneller en beter te presteren.",
    "This book highlights how more efficient workflows, automation and collaboration can improve speed and performance.",
    "Das Buch zeigt, wie effizientere Arbeitsabläufe, Automatisierung und Zusammenarbeit zu schnelleren und besseren Ergebnissen beitragen können.",
    "Ce livre montre comment des processus plus efficaces, l’automatisation et la collaboration permettent d’améliorer la rapidité et les résultats.",
    "O livro mostra como processos de trabalho mais eficientes, a automatização e a colaboração podem ajudar a trabalhar mais depressa e com melhores resultados."
  ],
  [
    "Het behandelt concepten zoals containerisatie, orkestratie, service discovery en load balancing binnen een cloud-native omgeving.",
    "It covers concepts such as containerisation, orchestration, service discovery and load balancing in a cloud-native environment.",
    "Es behandelt Konzepte wie Containerisierung, Orchestrierung, Service Discovery und Lastverteilung in einer Cloud-nativen Umgebung.",
    "Il aborde la conteneurisation, l’orchestration, la découverte de services et la répartition de charge dans un environnement cloud-native.",
    "Aborda conceitos como contentorização, orquestração, descoberta de serviços e balanceamento de carga num ambiente cloud-native."
  ],
  [
    "for Dummies is een eenvoudig en toegankelijk boek dat de basisprincipes van Agile-methodologieën uitlegt, zoals Scrum en Kanban, om teams te helpen flexibel en efficiënt samen te werken.",
    "This accessible book in the For Dummies series explains the basics of Agile methodologies, including Scrum and Kanban, to help teams collaborate flexibly and efficiently.",
    "Dieses leicht verständliche Buch aus der Für-Dummies-Reihe erklärt die Grundlagen agiler Methoden wie Scrum und Kanban und hilft Teams, flexibel und effizient zusammenzuarbeiten.",
    "Ce livre accessible de la collection Pour les Nuls explique les bases des méthodes agiles, comme Scrum et Kanban, pour aider les équipes à collaborer avec souplesse et efficacité.",
    "Este livro acessível da coleção For Dummies explica os princípios das metodologias ágeis, como Scrum e Kanban, para ajudar as equipas a colaborar de forma flexível e eficiente."
  ],
  [
    "Netwerkbeheer met windows server",
    "Network administration with Windows Server",
    "Netzwerkadministration mit Windows Server",
    "Administration réseau avec Windows Server",
    "Administração de redes com Windows Server"
  ],
  [
    "Het boek bespreekt netwerking,DNS, file-sharing, rdp, AD DS en windows installatie in hyper-v",
    "The book covers networking, DNS, file sharing, RDP, AD DS and installing Windows in Hyper-V.",
    "Das Buch behandelt Netzwerke, DNS, Dateifreigaben, RDP, AD DS und die Installation von Windows in Hyper-V.",
    "Ce livre traite des réseaux, du DNS, du partage de fichiers, de RDP, d’AD DS et de l’installation de Windows dans Hyper-V.",
    "O livro aborda redes, DNS, partilha de ficheiros, RDP, AD DS e a instalação do Windows no Hyper-V."
  ],
  [
    "Conflicten beheer",
    "Conflict management",
    "Konfliktmanagement",
    "Gestion des conflits",
    "Gestão de conflitos"
  ],
  [
    "Anticiperen op conflicten die zich voordien in teamverband en preventief opereren.",
    "Anticipating conflicts within teams and taking preventive action.",
    "Konflikte im Team frühzeitig erkennen und vorbeugend handeln.",
    "Anticiper les conflits au sein d’une équipe et agir de manière préventive.",
    "Antecipar conflitos no seio das equipas e atuar de forma preventiva."
  ],
  [
    "Opleiden en begleiden van instromingen en onderhouden/bijsturen van huidige perticipanten.",
    "Training and supporting newcomers, and coaching existing team members.",
    "Neue Mitarbeitende ausbilden und begleiten sowie bestehende Teammitglieder betreuen und weiterentwickeln.",
    "Former et accompagner les nouveaux arrivants, et assurer le suivi des membres de l’équipe.",
    "Formar e acompanhar novos colaboradores e apoiar o desenvolvimento dos atuais membros da equipa."
  ],
  [
    "beheren van foodcost en PNL.",
    "Managing food costs and profit and loss (P&L).",
    "Lebensmittelkosten und Gewinn- und Verlustrechnung verwalten.",
    "Gérer les coûts alimentaires et le compte de résultat.",
    "Gerir os custos alimentares e a demonstração de resultados."
  ],
  [
    "Diploma Secundair",
    "Secondary education diploma",
    "Sekundarschulabschluss",
    "Diplôme de l’enseignement secondaire",
    "Diploma do ensino secundário"
  ],
  [
    "Diploma Secundair onderwijs gelijktijdig behaald met het diploma Computeroperator.",
    "Secondary education diploma obtained alongside the Computer Operator diploma.",
    "Sekundarschulabschluss, gleichzeitig mit dem Abschluss als Computeroperator erworben.",
    "Diplôme de l’enseignement secondaire obtenu en même temps que le diplôme d’opérateur informatique.",
    "Diploma do ensino secundário obtido em simultâneo com o diploma de operador de informática."
  ],
  [
    "Beheren en configureren van netwerken, Windows en Linux besturingssystemen en hardware. (Pc's, laptops, raspberry's, Ap,...)",
    "Managing and configuring networks, Windows and Linux operating systems, and hardware (PCs, laptops, Raspberry Pi devices, access points, etc.).",
    "Netzwerke, Windows- und Linux-Betriebssysteme sowie Hardware verwalten und konfigurieren (PCs, Laptops, Raspberry Pis, Access Points usw.).",
    "Gérer et configurer des réseaux, des systèmes Windows et Linux et du matériel (PC, ordinateurs portables, Raspberry Pi, points d’accès, etc.).",
    "Gerir e configurar redes, sistemas operativos Windows e Linux e hardware (PCs, portáteis, Raspberry Pi, pontos de acesso, etc.)."
  ],
  [
    "Vaardigheden",
    "Skills",
    "Fähigkeiten",
    "Compétences",
    "Competências"
  ],
  [
    "Talen (📚✍🗣)",
    "Languages (📚✍🗣)",
    "Sprachen (📚✍🗣)",
    "Langues (📚✍🗣)",
    "Idiomas (📚✍🗣)"
  ],
  [
    "Nederlands",
    "Dutch",
    "Niederländisch",
    "Néerlandais",
    "Neerlandês"
  ],
  [
    "Engels",
    "English",
    "Englisch",
    "Anglais",
    "Inglês"
  ],
  [
    "Frans",
    "French",
    "Französisch",
    "Français",
    "Francês"
  ],
  [
    "Ik ben een hands-on IT-professional met een sterke interesse in hardware, Linux-systemen, netwerken en technische troubleshooting. Dankzij mijn opleidingen in computeroperator en systeem- en netwerkbeheer heb ik een brede technische basis opgebouwd die ik dagelijks verder uitbreid via praktijkervaring en persoonlijke projecten.",
    "I am a hands-on IT professional with a strong interest in hardware, Linux systems, networking and technical troubleshooting. My training in computer operations and systems and network administration has given me a broad technical foundation, which I continue to develop through practical experience and personal projects.",
    "Ich bin ein praxisorientierter IT-Fachmann mit großem Interesse an Hardware, Linux-Systemen, Netzwerken und technischer Fehlerbehebung. Durch meine Ausbildungen zum Computeroperator sowie in der System- und Netzwerkadministration habe ich eine breite technische Grundlage aufgebaut, die ich durch praktische Erfahrungen und persönliche Projekte täglich erweitere.",
    "Je suis un professionnel de l’informatique orienté vers la pratique, avec un vif intérêt pour le matériel, les systèmes Linux, les réseaux et le dépannage technique. Mes formations d’opérateur informatique et en administration systèmes et réseaux m’ont donné une solide base technique que je développe au quotidien grâce à la pratique et à mes projets personnels.",
    "Sou um profissional de informática orientado para a prática, com um forte interesse em hardware, sistemas Linux, redes e resolução de problemas técnicos. As minhas formações em operação de computadores e administração de sistemas e redes deram-me uma base técnica abrangente, que continuo a desenvolver através da experiência prática e de projetos pessoais."
  ],
  [
    "Naast mijn opleidingen ben ik actief bezig met open-source oplossingen, Raspberry Pi-projecten, webontwikkeling en systeemconfiguratie. Ik haal veel voldoening uit het analyseren van technische problemen, het optimaliseren van systemen en het zoeken naar efficiënte oplossingen.",
    "Alongside my studies, I actively work with open-source solutions, Raspberry Pi projects, web development and system configuration. I enjoy analysing technical problems, optimising systems and finding efficient solutions.",
    "Neben meinen Ausbildungen beschäftige ich mich aktiv mit Open-Source-Lösungen, Raspberry-Pi-Projekten, Webentwicklung und Systemkonfiguration. Technische Probleme zu analysieren, Systeme zu optimieren und effiziente Lösungen zu finden, bereitet mir große Freude.",
    "En parallèle de mes formations, je travaille sur des solutions open source, des projets Raspberry Pi, le développement web et la configuration de systèmes. J’aime analyser les problèmes techniques, optimiser les systèmes et rechercher des solutions efficaces.",
    "Para além das minhas formações, trabalho ativamente com soluções de código aberto, projetos Raspberry Pi, desenvolvimento web e configuração de sistemas. Sinto grande satisfação em analisar problemas técnicos, otimizar sistemas e encontrar soluções eficientes."
  ],
  [
    "Door mijn eerdere ervaring in leidinggevende functies binnen de horeca heb ik sterke communicatieve vaardigheden ontwikkeld en geleerd om stressbestendig, klantgericht en oplossingsgericht te werken. Die combinatie van technische interesse en mensgericht werken zorgt ervoor dat ik mij zowel comfortabel voel in een technische omgeving als in direct contact met klanten of collega’s.",
    "My previous experience in leadership roles in hospitality helped me develop strong communication skills and taught me to work well under pressure, with a focus on customers and solutions. This combination of technical interest and a people-oriented approach makes me equally comfortable in a technical environment and in direct contact with customers or colleagues.",
    "Durch meine frühere Erfahrung in Führungspositionen in der Gastronomie habe ich ausgeprägte Kommunikationsfähigkeiten entwickelt und gelernt, auch unter Druck kunden- und lösungsorientiert zu arbeiten. Die Verbindung von technischem Interesse und Freude am Umgang mit Menschen sorgt dafür, dass ich mich sowohl in einem technischen Umfeld als auch im direkten Kontakt mit Kunden oder Kollegen wohlfühle.",
    "Mon expérience dans des fonctions de responsable en restauration m’a permis de développer de solides compétences en communication et d’apprendre à travailler sous pression, avec le souci du client et des solutions. Cette combinaison d’intérêt technique et d’approche humaine me permet d’être à l’aise aussi bien dans un environnement technique qu’au contact direct des clients ou des collègues.",
    "A minha experiência anterior em funções de chefia na restauração permitiu-me desenvolver fortes competências de comunicação e aprender a trabalhar sob pressão, com foco no cliente e na resolução de problemas. Esta combinação de interesse técnico e atenção às pessoas faz com que me sinta à vontade tanto num ambiente técnico como no contacto direto com clientes ou colegas."
  ],
  [
    "Ik ben leergierig, praktisch ingesteld en voel mij het meest thuis in een dynamische en hands-on werkomgeving waar technologie, probleemoplossing en innovatie centraal staan.",
    "I am eager to learn, practical-minded and most at home in a dynamic, hands-on working environment centred on technology, problem-solving and innovation.",
    "Ich bin lernbegierig, praktisch veranlagt und fühle mich in einem dynamischen, praxisorientierten Arbeitsumfeld am wohlsten, in dem Technologie, Problemlösung und Innovation im Mittelpunkt stehen.",
    "Curieux d’apprendre et pragmatique, je m’épanouis dans un environnement de travail dynamique et concret, où la technologie, la résolution de problèmes et l’innovation occupent une place centrale.",
    "Tenho vontade de aprender, uma atitude prática e sinto-me particularmente à vontade num ambiente de trabalho dinâmico, onde a tecnologia, a resolução de problemas e a inovação são centrais."
  ],
  [
    "Activiteiten organiseren voor tieners en ondersteunende begleider voor kinderen tussen 6-8j",
    "Organising activities for teenagers and assisting with the supervision of children aged 6–8.",
    "Aktivitäten für Jugendliche organisieren und Kinder im Alter von 6 bis 8 Jahren mitbetreuen.",
    "Organiser des activités pour les adolescents et aider à encadrer les enfants de 6 à 8 ans.",
    "Organizar atividades para adolescentes e apoiar o acompanhamento de crianças dos 6 aos 8 anos."
  ],
  [
    "Eerste studentenjob",
    "First student job",
    "Erster Studentenjob",
    "Premier job étudiant",
    "Primeiro trabalho de estudante"
  ],
  [
    "Aanvuller, spiegelen en kassier",
    "Stocking and facing shelves, and working as a cashier.",
    "Regale auffüllen, Waren ansprechend ausrichten und an der Kasse arbeiten.",
    "Réapprovisionner les rayons, assurer la présentation des produits et travailler en caisse.",
    "Repor e organizar produtos nas prateleiras e trabalhar na caixa."
  ],
  [
    "Barverantwoordelijke. Discotheek had verschillende barren waar werd afgewisseld.",
    "Bar supervisor, rotating between the nightclub’s different bars.",
    "Barverantwortlicher mit wechselnden Einsätzen an den verschiedenen Bars der Diskothek.",
    "Responsable de bar, avec rotation entre les différents bars de la discothèque.",
    "Responsável de bar, com rotação pelos vários bares da discoteca."
  ],
  [
    "Barman",
    "Bartender",
    "Barkeeper",
    "Barman",
    "Empregado de bar"
  ],
  [
    "Franchise met verschillende filialen waar ik als teamleader jaarlijks of 2 jaarlijks van filiaal veranderden..",
    "Team leader in a franchise with several branches, moving to a different branch every one or two years.",
    "Teamleiter in einem Franchiseunternehmen mit mehreren Filialen, mit Filialwechseln alle ein bis zwei Jahre.",
    "Chef d’équipe dans une franchise comptant plusieurs établissements, avec un changement d’établissement tous les ans ou tous les deux ans.",
    "Chefe de equipa numa franquia com vários estabelecimentos, mudando de estabelecimento a cada um ou dois anos."
  ],
  [
    "Als vrijwilliger mensen helpen met hun digitale struikelblokken.",
    "Volunteering to help people overcome difficulties with digital technology.",
    "Menschen ehrenamtlich bei Schwierigkeiten im Umgang mit digitaler Technik unterstützen.",
    "Aider bénévolement les personnes qui rencontrent des difficultés avec les outils numériques.",
    "Ajudar pessoas, como voluntário, a ultrapassar dificuldades com a tecnologia digital."
  ],
  [
    "Logistiek administratief medewerker",
    "Logistics administrative assistant",
    "Kaufmännischer Mitarbeiter in der Logistik",
    "Employé administratif en logistique",
    "Assistente administrativo de logística"
  ],
  [
    "Ontwerpen en graveren.",
    "Designing and engraving.",
    "Entwerfen und Gravieren.",
    "Conception et gravure.",
    "Desenho e gravação."
  ],
  [
    "Programmeren met javascript, html en css",
    "Programming with JavaScript, HTML and CSS.",
    "Programmieren mit JavaScript, HTML und CSS.",
    "Programmation en JavaScript, HTML et CSS.",
    "Programação com JavaScript, HTML e CSS."
  ],
  [
    "Verdiepen in Windows en unix systemen en basis aan netwerken/subnetting/routing/... .",
    "In-depth study of Windows and Unix systems, and the basics of networking, subnetting and routing.",
    "Vertiefung in Windows- und Unix-Systeme sowie Grundlagen von Netzwerken, Subnetting und Routing.",
    "Approfondissement des systèmes Windows et Unix et bases des réseaux, du sous-réseautage et du routage.",
    "Aprofundamento de sistemas Windows e Unix e bases de redes, sub-redes e encaminhamento."
  ],
  [
    "Scripting, programmeren met Python en Powershell, verdiepen in unix en Active Directory, monitoring en etherprise routing.",
    "Scripting and programming with Python and PowerShell, advanced Unix and Active Directory, monitoring and enterprise routing.",
    "Skripting und Programmierung mit Python und PowerShell, Vertiefung in Unix und Active Directory, Monitoring und Routing in Unternehmensnetzwerken.",
    "Scripting et programmation en Python et PowerShell, approfondissement d’Unix et d’Active Directory, supervision et routage d’entreprise.",
    "Scripting e programação com Python e PowerShell, aprofundamento de Unix e Active Directory, monitorização e encaminhamento em redes empresariais."
  ],
  [
    "Temperaturen, kruisbesmetting,personenhygiëne en meer.",
    "Temperatures, cross-contamination, personal hygiene and more.",
    "Temperaturen, Kreuzkontamination, Personalhygiene und mehr.",
    "Températures, contamination croisée, hygiène personnelle et autres sujets.",
    "Temperaturas, contaminação cruzada, higiene pessoal e outros temas."
  ],
  [
    "Balans opmake, fictief bedrijf opzetten, balans maken en regels rond btw en... .",
    "Preparing balance sheets, setting up a fictional business and learning VAT rules.",
    "Bilanzen erstellen, ein fiktives Unternehmen gründen und Mehrwertsteuerregeln kennenlernen.",
    "Établir un bilan, créer une entreprise fictive et apprendre les règles de TVA.",
    "Elaborar balanços, criar uma empresa fictícia e aprender as regras do IVA."
  ],
  [
    "Personeel aansturen opleiden evalueren en aanwerven. (star, roos van Leary)",
    "Managing, training, assessing and recruiting staff (STAR method and Leary’s interpersonal model).",
    "Personal führen, ausbilden, beurteilen und einstellen (STAR-Methode und Learys Interaktionsmodell).",
    "Encadrer, former, évaluer et recruter du personnel (méthode STAR et modèle interpersonnel de Leary).",
    "Gerir, formar, avaliar e recrutar pessoal (método STAR e modelo interpessoal de Leary)."
  ],
  [
    "Werken met 'KPI's' en PNL, berekenen van coëficienten en foodkostbeheer.",
    "Working with KPIs and profit and loss (P&L), calculating ratios and managing food costs.",
    "Mit KPIs und Gewinn- und Verlustrechnungen arbeiten, Kennzahlen berechnen und Lebensmittelkosten verwalten.",
    "Travailler avec les KPI et le compte de résultat, calculer des ratios et gérer les coûts alimentaires.",
    "Trabalhar com indicadores de desempenho e demonstrações de resultados, calcular rácios e gerir os custos alimentares."
  ],
  [
    "Encora opleiding",
    "Encora training",
    "Ausbildung bei Encora",
    "Formation Encora",
    "Formação Encora"
  ],
  [
    "conflictenbeheer",
    "Conflict management",
    "Konfliktmanagement",
    "Gestion des conflits",
    "Gestão de conflitos"
  ],
  [
    "leermeester",
    "Workplace trainer",
    "Betrieblicher Ausbilder",
    "Tuteur en entreprise",
    "Formador em contexto de trabalho"
  ],
  [
    "financieel beleid",
    "Financial management",
    "Finanzmanagement",
    "Gestion financière",
    "Gestão financeira"
  ],
  [
    "networkbeheer-win-server",
    "Network administration with Windows Server",
    "Netzwerkadministration mit Windows Server",
    "Administration réseau avec Windows Server",
    "Administração de redes com Windows Server"
  ],
  [
    "Software",
    "Software",
    "Software",
    "Logiciels",
    "Software"
  ],
  [
    "Quick (Franchise)",
    "Quick (franchise)",
    "Quick (Franchise)",
    "Quick (franchise)",
    "Quick (franquia)"
  ]
];
  const heroRows = [
 ["Toegewijde samenwerking", "Dedicated collaboration", "Engagierte Zusammenarbeit", "Collaboration engagée", "Colaboração empenhada"],
 ["Harmonie in het team", "Harmony within the team", "Harmonie im Team", "Harmonie dans l’équipe", "Harmonia na equipa"],
 ["Iedereen draagt bij", "Everyone contributes", "Alle leisten einen Beitrag", "Chacun apporte sa contribution", "Todos contribuem"],
 ["Effectieve communicatie", "Effective communication", "Effektive Kommunikation", "Communication efficace", "Comunicação eficaz"],
 ["Respect voor elkaar", "Mutual respect", "Gegenseitiger Respekt", "Respect mutuel", "Respeito mútuo"],
 ["Resultaten samen behalen", "Achieving results together", "Gemeinsam Ergebnisse erzielen", "Obtenir des résultats ensemble", "Alcançar resultados em conjunto"],
 ["Yes-mentaliteit stimuleren", "Encouraging a can-do attitude", "Eine positive Einstellung fördern", "Encourager une attitude positive", "Incentivar uma atitude positiva"]
];
  const languages = ["nl", "en", "de", "fr", "pt"];
  const storageKey = "thierry-curriculum-language";
  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const dictionary = new Map(translationRows.map(row => [normalize(row[0]), row]));
  const dutchLabels = { Phone: "Telefoon", Mail: "E-mail", Contactform: "Contactformulier" };
  const selectLabels = ["Kies een taal", "Choose a language", "Sprache wählen", "Choisir une langue", "Escolher um idioma"];
  const sidebarLabels = ["Vaardigheden tonen of verbergen", "Show or hide skills", "Fähigkeiten ein- oder ausblenden", "Afficher ou masquer les compétences", "Mostrar ou ocultar competências"];

  function initLanguageMenu() {
    const menu = document.getElementById("language-select");
    if (!menu) return;

    // Bewaar de oorspronkelijke tekstnodes, zodat iconen, knoppen, <br>'s en
    // bestaande eventlisteners intact blijven, ook na herhaald wisselen.
    // Dit draait na de bestaande DOMContentLoaded-code: carrouselkopieën zijn er al.
    const textTargets = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest("script, style, select, .overlay-text dd, [translate='no']")) continue;
      const original = node.nodeValue;
      const key = normalize(original);
      if (dictionary.has(key)) textTargets.push({ node, original, key });
    }

    const attributeTargets = [];
    document.querySelectorAll("[data-tooltip], [alt], [title], [aria-label], [placeholder]").forEach(element => {
      for (const attribute of ["data-tooltip", "alt", "title", "aria-label", "placeholder"]) {
        const original = element.getAttribute(attribute);
        if (original && dictionary.has(normalize(original))) {
          attributeTargets.push({ element, attribute, original, key: normalize(original) });
        }
      }
    });

    const heroTargets = Array.from(document.querySelectorAll(".overlay-text dd")).map(element => ({
      element,
      original: Array.from(element.childNodes, node => node.cloneNode(true))
    }));

    function translated(key, index) {
      if (index === 0 && dutchLabels[key]) return dutchLabels[key];
      return dictionary.get(key)?.[index] ?? key;
    }

    function applyLanguage(language) {
      if (!languages.includes(language)) language = "nl";
      const index = languages.indexOf(language);
      document.documentElement.lang = language === "pt" ? "pt-PT" : language;
      menu.value = language;
      menu.setAttribute("aria-label", selectLabels[index]);
      document.getElementById("toggle-sidebar")?.setAttribute("aria-label", sidebarLabels[index]);

      textTargets.forEach(({ node, original, key }) => {
        // Behoud de witruimte rond tekst, bijvoorbeeld na een pictogram.
        node.nodeValue = index === 0 && !dutchLabels[key]
          ? original
          : original.replace(/\S[\s\S]*\S|\S/, () => translated(key, index));
      });
      attributeTargets.forEach(({ element, attribute, original, key }) => {
        element.setAttribute(attribute, index === 0 ? original : translated(key, index));
      });

      heroTargets.forEach(({ element, original }, position) => {
        if (!heroRows[position]) return;
        if (index === 0) {
          element.replaceChildren(...original.map(node => node.cloneNode(true)));
        } else {
          const sentence = heroRows[position][index];
          const initial = document.createElement("strong");
          initial.className = "text-capitalize";
          initial.textContent = sentence.charAt(0);
          element.replaceChildren(initial, document.createTextNode(sentence.slice(1)));
        }
      });

      // Verberg een eventueel nog open tabeltip met tekst in de vorige taal.
      const rowTooltip = document.getElementById("row-tooltip");
      if (rowTooltip) rowTooltip.style.display = "none";

      // De dropdown blijft werken als de browser lokale opslag blokkeert.
      try { localStorage.setItem(storageKey, language); } catch (_) { /* Geen opslag beschikbaar. */ }
    }

    let savedLanguage = "nl";
    try { savedLanguage = localStorage.getItem(storageKey) || "nl"; } catch (_) { /* Gebruik Nederlands. */ }
    menu.addEventListener("change", () => applyLanguage(menu.value));
    applyLanguage(savedLanguage);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageMenu);
  } else {
    initLanguageMenu();
  }
})();


