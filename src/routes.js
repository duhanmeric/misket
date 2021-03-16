const AuthController = require("./controllers/AuthController.js");
const ProjectController = require("./controllers/ProjectController.js");

module.exports = (app) => {
  app.post("/api/login", AuthController.login);
  app.post("/api/register", AuthController.register);
  app.get("/api/verification/:confirmationTicket", AuthController.verification);
  app.post("/api/create-project", ProjectController.createProject);
};
