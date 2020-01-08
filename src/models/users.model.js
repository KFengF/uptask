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
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Add a valid email"
        },
        notEmpty: {
          msg: "The email can't be empty"
        }
      },
      unique: {
        args: true,
        msg: "Email already registered"
      }
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The password can't be empty"
        }
      }
    }
  });

  Users.hasMany(await ProjectsPromise);

  return Users;
});

module.exports = UsersPromise;
