const Sequelize = require("sequelize");
const dbPromise = require("../config/db.config");
const ProjectsPromise = require("./projects.model");

const UsersPromise = dbPromise.then(async db => {
  const Users = db.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false
    }
  });

  Users.hasMany(await ProjectsPromise);

  return Users;
});

module.exports = UsersPromise;
