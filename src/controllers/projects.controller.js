const ProjectsPromise = require("../models/Projects.model");
const TasksPromise = require("../models/Tasks.model");

exports.root = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();

  res.render("index.view.pug", { pageTitle: "Projects", projects });
  //Indica que pagina renderizar, y sus variables
};

exports.new = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  res.render("new.view.pug", {
    pageTitle: "New Project",
    projects
  });
};

exports.postNew = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  const { name } = req.body;
  const errors = [];

  if (!name) errors.push({ text: "Enter a name please" });

  if (errors.length > 0) {
    res.render("new.view.pug", {
      pageTitle: "New Project",
      errors,
      projects
    });
  } else {
    try {
      await Projects.create({ name });
    } catch (error) {
      console.error(error);
    }

    res.redirect("/");
  }
};

exports.project = async (req, res, next) => {
  const Projects = await ProjectsPromise;
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: { url: req.params.url }
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ]);
  const Tasks = await TasksPromise;
  const tasks = await Tasks.findAll({ where: { projectId: project.id } });

  if (project) {
    res.render("project.view.pug", {
      pageTitle: "Project tasks",
      project,
      projects,
      tasks
    });
  } else return next();
};

exports.projectEdit = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where: { url: req.params.url }
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ]);

  res.render("new.view.pug", {
    pageTitle: "Edit Project",
    projects,
    project
  });
};

exports.updateNew = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  const { name } = req.body;
  const errors = [];

  if (!name) errors.push({ text: "Enter a name please" });

  if (errors.length > 0) {
    res.render("new.view.pug", {
      pageTitle: "New Project",
      errors,
      projects
    });
  } else {
    try {
      await Projects.update({ name }, { where: { id: req.params.id } });
    } catch (error) {
      console.error(error);
    }

    res.redirect("/");
  }
};

exports.deleteProject = async (req, res, next) => {
  const { url } = req.params;
  const Projects = await ProjectsPromise;

  const result = await Projects.destroy({ where: { url } });

  if (result) res.status(204).send();
  else return next();
};
