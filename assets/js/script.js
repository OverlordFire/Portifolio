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

document.addEventListener("DOMContentLoaded", () => {
    const models = document.querySelectorAll(".model");

    models.forEach(model => {
    const modelId = model.getAttribute("data-model-id");
    const titleEl = model.querySelector(".auto-title");

    fetch(`https://api.sketchfab.com/v3/models/${modelId}`)
        .then(res => res.json())
        .then(data => {
        titleEl.textContent = data.name || "Modelo sem nome";
        })
        .catch(err => {
        titleEl.textContent = "Erro ao carregar nome";
        console.error("Erro:", err);
        });
    });
});



