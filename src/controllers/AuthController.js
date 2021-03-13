const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

jwtSignUser = (user) => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
};

module.exports = {
  login(req, res) {
    try {
      const { userEmail, userPassword } = req.body;
      const user = {
        userEmail,
        userPassword,
      };
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },

  async register(req, res) {
    try {
      console.log(req.body);
      const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      const userJson = user.toJSON();
      res.send({ user: userJson, token: jwtSignUser(userJson) });
    } catch (error) {
      console.log(error);
    }
  },
};
