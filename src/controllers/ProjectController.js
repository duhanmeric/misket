const { Project } = require("../models");

module.exports = {
  async createProject(req, res) {
    try {
      const { title, UserId } = req.body;
      // console.log(req.body.title, req.body.UserId);
      const project = await Project.create({
        title: title,
        UserId: UserId,
      });
      console.log(project);
    } catch (error) {
      console.log(error);
    }
  },
};
