const { validationResult } = require("express-validator");
const utils = require("./controllers.utils");
// const ProjectsPromise = require("../models/Projects.model");
const TasksPromise = require("../models/tasks.model");

exports.postTask = async (req, res) => {
  try {
    const errors = validationResult(req).errors;
    const { url } = req.params;
    const { task } = req.body;
    const { projects, project } = await utils.ProjectsFindAllAndOne({
      userId: res.locals.user.id,
      url
    });
    const Tasks = await TasksPromise;
    const tasks = await Tasks.findAll({
      where: { projectId: project.id }
    });

    if (errors.length) {
      res.render("project.view.pug", {
        pageTitle: "Project tasks",
        project,
        projects,
        tasks,
        errors
      });
    } else {
      try {
        await Tasks.create({
          task,
          state: 0,
          projectId: project.id
        });

        res.redirect(`/projects/${url}`);
      } catch (error) {
        res.render("project.view.pug", {
          pageTitle: "Project tasks",
          project,
          projects,
          tasks,
          errors: errors.push({ msg: "Couldn't post the task" })
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.patchState = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await utils.TaskFindOne({ where: { id } });

    task.state = !task.state;

    await task.save();

    res.status(201).send();
  } catch (error) {
    console.error(error);

    res.status(400).send();
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const Tasks = await TasksPromise;

    await Tasks.destroy({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(400).send();
  }
};
