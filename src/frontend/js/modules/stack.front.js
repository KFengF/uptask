export const handleStack = () => {
  const navBar = document.querySelector(".contenedor-proyectos");

  if (!navBar.style.display) {
    const main = document.querySelector(".contenido-principal");

    navBar.style.cssText = "display: unset; position: absolute";

    const background = document.createElement("div");

    background.classList.add("background");
    background.setAttribute(
      "onclick",
      "customFunctions.handleStack()"
    );

    main.insertBefore(background, main.firstChild);
  } else {
    navBar.style.cssText = "";

    document.querySelector(".background").remove();
  }
};
