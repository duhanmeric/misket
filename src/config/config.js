require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  options: {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
