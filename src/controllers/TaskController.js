const { Task } = require("../models");

module.exports = {
  async getTasks(req, res) {
    try {
      const { ProjectId } = req.query;
      if (ProjectId) {
        const tasks = await Task.findAll({
          where: {
            ProjectId: ProjectId,
          },
        });
        res.send(tasks);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async addTask(req, res) {
    try {
      const { title, completed, ProjectId } = req.body;
      console.log(ProjectId);
      const task = await Task.create({
        title: title,
        completed: completed,
        ProjectId: ProjectId,
      });
      res.send(task);
    } catch (error) {
      console.log(error);
    }
  },

  async changeTask(req, res) {
    try {
      if ("checkingId" in req.body) {
        const { checkingId } = req.body;
        const updatedTask = await Task.findOne({
          where: {
            id: checkingId,
          },
        });
        updatedTask.completed = !updatedTask.completed;
        await updatedTask.save();
        res.send(updatedTask);
      } else if ("editedTitle" in req.body) {
        const { editedTitle } = req.body;
        const { id } = req.params;
        const updatedTask = await Task.findOne({
          where: {
            id: id,
          },
        });
        updatedTask.title = editedTitle;
        await updatedTask.save();
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTask(req, res) {
    try {
      if ("deletedTaskId" in req.body) {
        const { deletedTaskId } = req.body;
        await Task.destroy({
          where: {
            id: deletedTaskId,
          },
        });
      } else if ("ProjectId" in req.body) {
        const { ProjectId } = req.body;
        await Task.destroy({
          where: {
            ProjectId: ProjectId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
