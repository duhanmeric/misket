const AuthController = require("./controllers/AuthController.js");

module.exports = (app) => {
  app.post("/api/login", AuthController.login);
  app.post("/api/register", AuthController.register);
  app.get("/api/verification/:confirmationTicket", AuthController.verification);
};
