const ProjectsPromise = require("../models/Projects.model");
const TasksPromise = require("../models/Tasks.model");

exports.ProjectsFindAll = () =>
  ProjectsPromise.then(Projects => Projects.findAll());

exports.ProjectsFindAllAndOne = async where => {
  const Projects = await ProjectsPromise;
  const projectsPromise = Projects.findAll();
  const projectPromise = Projects.findOne({
    where
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ]);

  return { projects, project };
};

exports.TasksFindAll = where =>
  TasksPromise.then(Tasks => Tasks.findAll({ where }));
