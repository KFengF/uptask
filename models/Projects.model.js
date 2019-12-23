const Sequelize = require("sequelize");
const db = require("../config/db.config");
const slug = require("slug");

//definiendo tabla
const Projects = db.then(db =>
  db.define(
    "projects",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING(100),
      url: Sequelize.TEXT
    },
    {
      hooks: {
        beforeCreate(project) {
          const url = slug(project.name).toLowerCase();
          project.url = url;
        }
      }
    }
  )
);

module.exports = Projects;
