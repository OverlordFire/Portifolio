/* ===== MODEL DETAIL PAGE LOGIC ===== */
(function () {
    const params   = new URLSearchParams(window.location.search);
    const currentId = parseInt(params.get('id'), 10);

    const viewer    = document.getElementById('detail-viewer');
    const titleEl   = document.getElementById('detail-name');
    const counterEl = document.getElementById('detail-counter');
    const btnPrev   = document.getElementById('btn-prev');
    const btnNext   = document.getElementById('btn-next');
    const container = document.getElementById('detail-container');
    const loading   = document.getElementById('detail-loading');
    const relatedSection = document.getElementById('related-section');
    const relatedStrip   = document.getElementById('related-strip');
    const relatedCount   = document.getElementById('related-count');

    fetch('js/model.json')
        .then(r => r.json())
        .then(models => {
            // Same sort order as homepage / TodosModelos
            models.sort((a, b) => b.id - a.id);

            const idx = models.findIndex(m => m.id === currentId);

            // Invalid id → redirect to gallery
            if (idx === -1) {
                window.location.href = 'TodosModelos.html';
                return;
            }

            const model = models[idx];
            const total = models.length;
            const prevModel = idx > 0            ? models[idx - 1] : null;
            const nextModel = idx < total - 1    ? models[idx + 1] : null;

            /* ── Page title ── */
            document.title = `${model.nome} — Tabyrione`;

            /* ── Viewer ── */
            viewer.setAttribute('src', `models/${model.arquivo}`);
            viewer.setAttribute('alt', model.nome);

            /* ── Info ── */
            titleEl.textContent = model.nome;
            counterEl.textContent = `Modelo ${idx + 1} de ${total}`;

            /* ── Prev / Next buttons ── */
            if (prevModel) {
                btnPrev.href = `model.html?id=${prevModel.id}`;
                btnPrev.title = prevModel.nome;
            } else {
                btnPrev.classList.add('disabled');
                btnPrev.removeAttribute('href');
            }

            if (nextModel) {
                btnNext.href = `model.html?id=${nextModel.id}`;
                btnNext.title = nextModel.nome;
            } else {
                btnNext.classList.add('disabled');
                btnNext.removeAttribute('href');
            }

            /* ── Show layout ── */
            loading.style.display  = 'none';
            container.style.display = '';

            /* ── Related strip (all others) ── */
            const others = models.filter(m => m.id !== model.id);
            relatedCount.textContent = `${others.length} modelos`;

            others.forEach(m => {
                const a = document.createElement('a');
                a.href = `model.html?id=${m.id}`;
                a.className = 'related-card';
                a.innerHTML = `
                    <model-viewer
                        alt="${m.nome}"
                        src="models/${m.arquivo}"
                        autoplay
                        camera-controls
                        interaction-prompt="none"
                        disable-zoom>
                    </model-viewer>
                    <p>${m.nome}</p>
                `;
                relatedStrip.appendChild(a);
            });

            relatedSection.style.display = '';
        })
        .catch(err => {
            console.warn('Erro ao carregar modelo:', err);
            loading.textContent = 'Erro ao carregar. Tente novamente.';
        });
})();
