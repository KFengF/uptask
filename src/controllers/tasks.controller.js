const ProjectsPromise = require("../models/Projects.model");
const TasksPromise = require("../models/Tasks.model");

exports.newTask = async (req, res, next) => {
  const [Projects, Tasks] = await Promise.all([ProjectsPromise, TasksPromise]);
  const { url } = req.params;
  const { id } = await Projects.findOne({ where: { url } });
  const { task } = req.body;
  const result = await Tasks.create({ task, state: 0, projectId: id });

  if (result) res.redirect(`/projects/${url}`);
  else return next();
};
