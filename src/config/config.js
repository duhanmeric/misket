require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  database: process.env.DB_NAME || "heroku_cf3964b578f25b8",
  user: process.env.DB_USER || "b40423ea3c3cfd",
  password: process.env.PASS || "bba9ab48",
  options: {
    dialect: process.env.DIALECT || "mysql",
    host: process.env.HOST || "us-cdbr-east-03.cleardb.com",
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },

  // development: {
  //   username: "root",
  //   password: "X25dhb3sq.",
  //   database: "react-misket",
  //   host: "127.0.0.1",
  //   dialect: "mysql",
  //   authentication: {
  //     jwtSecret: process.env.JWT_SECRET,
  //   },
  // },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.PASS,
  //   database: process.env.DB_NAME,
  //   host: process.env.HOST,
  //   dialect: process.env.DIALECT,
  //   authentication: {
  //     jwtSecret: process.env.JWT_SECRET,
  //   },
  // },
};
