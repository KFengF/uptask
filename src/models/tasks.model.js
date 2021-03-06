const Sequelize = require("sequelize");
const dbPromise = require("../config/db.config");
const ProjectsPromise = require("./projects.model");

const TasksPromise = dbPromise.then(async db => {
  const Tasks = db.define("tasks", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task: Sequelize.STRING(100),
    state: Sequelize.BOOLEAN
  });

  Tasks.belongsTo(await ProjectsPromise);

  return Tasks;
});

module.exports = TasksPromise;
