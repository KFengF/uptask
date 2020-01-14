const mysql = require("mysql2/promise");
const Sequelize = require("sequelize");

const initializingDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_SERVER,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    });

    await connection.query(
      "CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME
    );

    return await new Sequelize(
      process.env.DB_NAME,
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
