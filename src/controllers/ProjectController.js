const { Project } = require("../models");

module.exports = {
  async createProject(req, res) {
    try {
      const { title, UserId } = req.body;
      const project = await Project.create({
        title: title,
        UserId: UserId,
      });
      res.send({
        id: project.id,
        title: project.title,
        UserId: project.UserId,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getProjects(req, res) {
    try {
      const { UserId } = req.query;
      console.log(UserId);
      const projects = await Project.findAll({
        where: {
          UserId: UserId,
        },
      });
      res.send(projects);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteProject(req, res) {
    try {
      const { ProjectId } = req.body;
      await Project.destroy({
        where: {
          id: ProjectId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
