const { Task } = require("../models");

module.exports = {
  async getTasks(req, res) {
    try {
      const { ProjectId } = req.query;
      const tasks = await Task.findAll({
        where: {
          ProjectId: ProjectId,
        },
      });
      res.send(tasks);
    } catch (error) {
      console.log(error);
    }
  },

  async addProject(req, res) {
    try {
      const { title, completed, ProjectId } = req.body;
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
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteTask(req, res) {
    try {
      const { id } = req.body;
      const deletedTask = await Task.findOne({
        where: {
          id: id,
        },
      });
      await deletedTask.destroy();
    } catch (error) {
      console.log(error);
    }
  },
};
