const express = require("express");
const { body } = require("express-validator/check");
//esto es un mini router para ser usado como middleware
const projectsController = require("../controllers/projects.controller");

const router = express.Router();

module.exports = () => {
  router.get("/", projectsController.home);
  router.get("/new", projectsController.new);
  router.post(
    "/new",
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    projectsController.newPost
  );

  return router;
};
// esto exporta una funcion que retornara un router con todos los url
// disponibles, se puede tambien poner las funciones de los routers
// fuera y exportar el router
