function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open')
        document.querySelector('.icon').src = "img/menu-mobile.svg";

    } else {
        menuMobile.classList.add('open')
        document.querySelector('.icon').src = "img/close-menu.svg";
    }

}
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

        const div = document.createElement("div");
        div.className = "model";

        div.innerHTML = `
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
        `;
        container.appendChild(div);
    });
});
