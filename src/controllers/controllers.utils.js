const ProjectsPromise = require("../models/projects.model");
const TasksPromise = require("../models/tasks.model");

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

exports.TaskFindOne = where =>
  TasksPromise.then(Tasks => Tasks.findOne({ where }));
