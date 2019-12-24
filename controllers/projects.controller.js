const ProjectsPromise = require("../models/Projects.model");

exports.root = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();

  res.render("index.view.pug", { pageTitle: "Projects", projects });
  //Indica que pagina renderizar, y sus variables
};

exports.new = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  res.render("new.view.pug", { pageTitle: "New Project", projects });
};

exports.newPost = async (req, res) => {
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
  const projects = await Projects.findAll();
  const project = await Projects.findOne({
    where: {
      url: req.params.url
    }
  });

  if (project) {
    res.render("project.view.pug", {
      pageTitle: "Project tasks",
      project,
      projects
    });
  } else return next();
};

exports.projectEdit = async (req, res) => {
  const Projects = await ProjectsPromise;
  const projects = await Projects.findAll();
  res.render("new.view.pug", { pageTitle: "Edit Project", projects });
};
