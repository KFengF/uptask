const stack = document.getElementById("stack");

if (stack)
  stack.addEventListener("click", () => {
    const navBar = document.querySelector(".contenedor-proyectos");
    const main = document.querySelector(".contenido-principal");

    if (!navBar.style.display) {
      navBar.style.cssText = "display: unset; position: absolute";
      const background = document.createElement("div");
      background.classList.add("background");
      console.log(background);

      main.insertBefore(background, main.firstChild);
      console.log(main);
    } else {
      navBar.style.cssText = "";

      document.querySelector(".background").remove();
    }
  });

export default stack;
