const { Task } = require("../models");

module.exports = {
  async addProject(req, res) {
    try {
      const { title, completed, ProjectId } = req.body;
      const task = await Task.create({
        title: title,
        completed: completed,
        ProjectId: ProjectId,
      });
      res.send(task);
      //   res.send({
      //     id: project.id,
      //     title: project.title,
      //     UserId: project.UserId,
      //   });
    } catch (error) {
      console.log(error);
    }
  },
};
