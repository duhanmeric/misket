const AuthController = require("./controllers/AuthController.js");
const ProjectController = require("./controllers/ProjectController.js");
const TaskController = require("./controllers/TaskController.js");

module.exports = (app) => {
  app.post("/api/login", AuthController.login);
  app.post("/api/register", AuthController.register);
  app.get("/api/verification/:confirmationTicket", AuthController.verification);

  app.post("/api/project", ProjectController.createProject);
  app.get("/api/project", ProjectController.getProjects);
  app.delete("/api/project", ProjectController.deleteProject);

  app.post("/api/task", TaskController.addTask);
  app.get("/api/task", TaskController.getTasks);
  app.delete("/api/task/:id", TaskController.deleteTask);
  app.patch("/api/task/:id", TaskController.changeTask);
};
