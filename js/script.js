/* ===== MOBILE MENU ===== */
function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    const btn = document.querySelector('.mobile-menu-icon button');
    const icon = document.querySelector('.icon');

    const isOpen = menuMobile.classList.contains('open');

    menuMobile.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', String(!isOpen));
    if (icon) icon.src = isOpen ? "img/menu-mobile.svg" : "img/close-menu.svg";
}

/* Close mobile menu on Escape */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const menuMobile = document.querySelector('.mobile-menu');
        const btn = document.querySelector('.mobile-menu-icon button');
        const icon = document.querySelector('.icon');
        if (menuMobile && menuMobile.classList.contains('open')) {
            menuMobile.classList.remove('open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            if (icon) icon.src = "img/menu-mobile.svg";
        }
    }
});

/* ===== STICKY NAV — glass on scroll ===== */
(function () {
    const header = document.getElementById('site-header');
    if (!header) return;

    const THRESHOLD = 20;

    function updateHeader() {
        if (window.scrollY > THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
})();

/* ===== LOAD 3D MODELS ===== */
fetch("js/model.json")
    .then(response => response.json())
    .then(models => {
        const container = document.getElementById("models-container");
        if (!container) return;

        models.sort((a, b) => b.id - a.id);

        const pagina = window.location.pathname;
        const isAllModelsPage = pagina.includes("TodosModelos");
        const limite = isAllModelsPage ? models.length : 7;

        models.slice(0, limite).forEach(model => {
            // Card is an <a> so it's keyboard-navigable and clickable anywhere
            const card = document.createElement("a");
            card.className = "model";
            card.href = `model.html?id=${model.id}`;

            card.innerHTML = `
                <h3>${model.nome}</h3>
                <model-viewer
                    class="model-3D"
                    alt="${model.nome}"
                    src="models/${model.arquivo}"
                    autoplay
                    camera-controls
                    interaction-prompt="none"
                    disable-zoom>
                </model-viewer>
                <span class="model-cta">Ver detalhes →</span>
            `;

            container.appendChild(card);
        });
    })
    .catch(err => console.warn("Erro ao carregar modelos:", err));