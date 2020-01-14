const ProjectsPromise = require("../models/projects.model");
const TasksPromise = require("../models/tasks.model");

exports.ProjectsFindAll = where =>
  ProjectsPromise.then(Projects => Projects.findAll(where));

exports.ProjectsFindAllAndOne = async where => {
  const Projects = await ProjectsPromise;
  const projectsPromise = Projects.findAll({
    where: { userId: where.userId }
  });
  const projectPromise = Projects.findOne({
    where: { url: where.url }
  });
  const [projects, project] = await Promise.all([
    projectsPromise,
    projectPromise
  ]);

  return { projects, project };
};

exports.TasksFindAll = where =>
  TasksPromise.then(Tasks => Tasks.findAll(where));

exports.TaskFindOne = where =>
  TasksPromise.then(Tasks => Tasks.findOne(where));
