const AuthController = require("./controllers/AuthController.js");
const ProjectController = require("./controllers/ProjectController.js");
const TaskController = require("./controllers/TaskController.js");

module.exports = (app) => {
  app.post("/api/login", AuthController.login);
  app.post("/api/register", AuthController.register);
  app.get("/api/verification/:confirmationTicket", AuthController.verification);
  app.post("/api/create-project", ProjectController.createProject);
  app.get("/api/get-projects", ProjectController.getProjects);
  app.delete("/api/delete-project", ProjectController.deleteProject);
  app.post("/api/add-task", TaskController.addProject);
  app.get("/api/get-tasks", TaskController.getTasks);
  app.delete("/api/delete-task", TaskController.deleteTask);
  app.patch("/api/change-task", TaskController.changeTask);
};
