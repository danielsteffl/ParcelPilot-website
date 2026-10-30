/* === MOBILE MENU === */
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open menu');
    };

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isExpanded = mobileMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', String(isExpanded));
        mobileToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMobileMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}

/* === PARCELS DATA === */
const parcelsData = [
    {
        id: "PP-1001-CZ",
        status: "V přepravě",
        statusClass: "in-transit",
        history: [
            { title: "Zásilka vytvořena", time: "Pondělí, 08:45 — Praha", done: true },
            { title: "Převzato kurýrem", time: "Pondělí, 10:15 — Praha", done: true },
            { title: "V přepravě na výdejní místo", time: "Dnes, 07:45 — Na trase do Plzně", done: false, active: true },
            { title: "Doručení příjemci", time: "Očekáváno dnes do 15:00", done: false }
        ]
    },
    {
        id: "PP-2002-CZ",
        status: "Doručeno",
        statusClass: "delivered",
        history: [
            { title: "Zásilka vytvořena", time: "Včera, 11:00 — Brno", done: true },
            { title: "Převzato kurýrem", time: "Včera, 13:20 — Brno", done: true },
            { title: "Doručeno příjemci", time: "Dnes, 12:45 — Ostrava", done: true, active: true }
        ]
    }
];

/* === QUICK TRACK === */
function quicktrack(code) {
    const input = document.getElementById('trackingInput');
    if (input) {
        input.value = code;
        trackparcel();
    }
}

/* === TRACK PARCEL === */
function trackparcel() {
    const input = document.getElementById('trackingInput');
    const resultBox = document.getElementById('trackingResult');

    if (!input || !resultBox) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
        alert('Zadejte prosím číslo zásilky.');
        return;
    }

    const parcel = parcelsData.find(p => p.id === code);

    if (parcel) {
        const timelineItems = parcel.history.map(item => `
            <div class="timeline-item ${item.active ? 'active' : (item.done ? 'completed' : '')}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <span>${item.time}</span>
                </div>
            </div>
        `).join('');
        resultBox.innerHTML = `
            <div class="status-header">
                <div>
                    <span style="font-size:0.8rem; color:var(--text-muted);">Číslo zásilky</span>
                    <strong>${parcel.id}</strong>
                </div>
                <span class="status-badge ${parcel.statusClass}">${parcel.status}</span>
            </div>
            <div class="timeline">${timelineItems}</div>
        `;
    } else {
        resultBox.innerHTML = `
            <div class="not-found-msg">
                <strong>Kód "${code}" nebyl nalezen</strong>
                Vyzkoušejte vzorové kódy PP-1001-CZ nebo PP-2002-CZ.
            </div>
        `;
    }
    resultBox.style.display = 'block';
}

/* === INIT LISTENERS === */
document.addEventListener('DOMContentLoaded', () => {
    const trackBtn = document.getElementById('trackBtn');
    const trackingInput = document.getElementById('trackingInput');

    if (trackBtn) {
        trackBtn.addEventListener('click', trackparcel);
    }
    if (trackingInput) {
        trackingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                trackparcel();
            }
        });
    }
});