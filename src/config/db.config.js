const mysql = require("mysql2/promise");
const Sequelize = require("sequelize");
require("dotenv").config();

const initializingDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_SERVER,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS uptask_db");

    return await new Sequelize(
      "uptask_db",
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_SERVER,
        dialect: "mysql",
        port: process.env.DB_PORT,
        define: {
          timestamps: false
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = initializingDB();
