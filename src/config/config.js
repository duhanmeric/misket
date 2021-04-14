require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  // database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.PASS,
  // options: {
  //   dialect: process.env.DIALECT,
  //   host: process.env.HOST,
  // },
  // authentication: {
  //   jwtSecret: process.env.JWT_SECRET,
  // },

  development: {
    username: "root",
    password: "X25dhb3sq.",
    database: "react-misket",
    host: "127.0.0.1",
    dialect: "mysql",
    authentication: {
      jwtSecret: process.env.JWT_SECRET,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.PASS,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    authentication: {
      jwtSecret: process.env.JWT_SECRET,
    },
  },
};
