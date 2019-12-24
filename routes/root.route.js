const express = require("express");
const { check } = require("express-validator");
//esto es un mini router para ser usado como middleware
const projectsController = require("../controllers/projects.controller");

const router = express.Router();

module.exports = () => {
  router.get("/", projectsController.root);
  router.get("/new", projectsController.new);
  router.post(
    "/new",
    check("name")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    projectsController.newPost
  );
  router.get("/projects/:url", projectsController.project);
  router.get("/projects/:url/edit", projectsController.projectEdit);

  return router;
};
// esto exporta una funcion que retornara un router con todos los url
// disponibles, se puede tambien poner las funciones de los routers
// fuera y exportar el router
