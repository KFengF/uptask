const Sequelize = require("sequelize");
const slug = require("slug");
const shortid = require("shortid");
const dbPromise = require("../config/db.config");

//definiendo tabla
const ProjectsPromise = dbPromise.then(db =>
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
          const url =
            slug(project.name).toLowerCase() + "-" + shortid.generate();
          //slug pone los guiones en vez de espacio

          project.url = url;
        }
      }
    }
  )
);

module.exports = ProjectsPromise;
