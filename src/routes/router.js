const express = require("express");
const { check } = require("express-validator");
const projectsController = require("../controllers/projects.controller");
const tasksController = require("../controllers/tasks.controller");
const usersController = require("../controllers/users.controller");

const router = express.Router();
//esto es un mini router para ser usado como middleware

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
    projectsController.postNew
  );
  router.get("/projects/:url", projectsController.project);
  router.get("/projects/:url/edit", projectsController.projectEdit);
  router.post(
    "/new/:id",
    check("name")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    projectsController.updateNew
  );
  router.delete("/projects/:url", projectsController.deleteProject);
  router.post(
    "/projects/:url",
    check("task")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    tasksController.postTask
  );
  router.patch("/tasks/:id", tasksController.patchState);
  router.delete("/tasks/:id", tasksController.deleteTask);
  router.get("/sign-up", usersController.signUp);
  router.post(
    "/sign-up",
    check("email")
      .isEmail()
      .not()
      .isEmpty()
      .trim(),
    usersController.postSignUp
  );

  return router;
};
// esto exporta una funcion que retornara un router con todos los url
// disponibles, se puede tambien poner las funciones de los routers
// fuera y exportar el router
