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


document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".model").forEach(card => {

    const viewer = card.querySelector("model-viewer");
    const title = card.querySelector(".auto-title");

    if (!viewer || !title) return;

    let file = viewer.getAttribute("src");

    if (!file) return;

    file = file.split("/").pop();
    file = file.replace(".glb", "");
    file = file.replace(/_/g, " ");
    file = file.replace(/\b\w/g, l => l.toUpperCase());

    title.textContent = file;
  });
});

