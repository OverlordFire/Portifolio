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


document.querySelectorAll(".model").forEach(card => {

  const viewer = card.querySelector("model-viewer");
  const title = card.querySelector(".auto-title");

  if (!viewer || !title) return;

  let file = viewer.getAttribute("src");

  // pega só o nome do arquivo
  file = file.split("/").pop();
  // remove extensão
  file = file.replace(".glb", "");
  // troca underline por espaço
  file = file.replace(/_/g, " ");
  // capitaliza cada palavra
  file = file.replace(/\b\w/g, l => l.toUpperCase());
  // coloca no h3
  title.textContent = file;
});
