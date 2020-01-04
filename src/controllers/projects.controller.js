const { validationResult } = require("express-validator");
const utils = require("./controllers.utils");
const ProjectsPromise = require("../models/projects.model");
// const TasksPromise = require("../models/Tasks.model");

exports.root = async (req, res, next) => {
  try {
    const projects = await utils.ProjectsFindAll();

    res.render("index.view.pug", { pageTitle: "Projects", projects });
    //Indica que pagina renderizar, y sus variables
  } catch (error) {
    console.error(error);

    return next();
  }
};

exports.new = async (req, res, next) => {
  try {
    const projects = await utils.ProjectsFindAll();

    res.render("new.view.pug", {
      pageTitle: "New Project",
      projects
    });
  } catch (error) {
    console.error(error);

    return next();
  }
};

exports.postNew = async (req, res) => {
  try {
    const errors = validationResult(req).errors;
    const Projects = await ProjectsPromise;
    const projects = await Projects.findAll();
    const { name } = req.body;

    if (errors.length) {
      res.render("new.view.pug", {
        pageTitle: "New Project",
        errors,
        projects
      });
    } else {
      await Projects.create({ name });

      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.project = async (req, res, next) => {
  try {
    const { projects, project } = await utils.ProjectsFindAllAndOne({
      url: req.params.url
    });

    if (project) {
      const tasks = await utils.TasksFindAll({
        projectId: project.id
      });

      res.render("project.view.pug", {
        pageTitle: "Project tasks",
        project,
        projects,
        tasks
      });
    } else return next();
  } catch (error) {
    console.error(error);

    return next();
  }
};

exports.projectEdit = async (req, res, next) => {
  try {
    const { projects, project } = await utils.ProjectsFindAllAndOne({
      url: req.params.url
    });

    res.render("new.view.pug", {
      pageTitle: "Edit Project",
      projects,
      project
    });
  } catch (error) {
    console.error(error);

    return next();
  }
};

exports.updateNew = async (req, res) => {
  const errors = validationResult(req).errors;
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  const { name } = req.body;

  if (errors.length) {
    res.render("new.view.pug", {
      pageTitle: "Edit Project",
      errors,
      projects
    });
  } else {
    try {
      await Projects.update(
        { name },
        { where: { id: req.params.id } }
      );

      res.redirect("/");
    } catch (error) {
      console.error(error);

      res.render("new.view.pug", {
        pageTitle: "Edit Project",
        errors: errors.push({ msg: "Couldn't update project" }),
        projects
      });
    }
  }
};

exports.deleteProject = async (req, res) => {
  const { url } = req.params;
  const Projects = await ProjectsPromise;

  try {
    await Projects.destroy({ where: { url } });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(400).send();
  }
};
