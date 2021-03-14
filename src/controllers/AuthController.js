const { User } = require("../models");
const { Ticket } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto");

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
      const { email, username, password } = req.body;
      const confirmationTicket = crypto.randomBytes(20).toString("hex");
      const user = await User.create({
        email: email,
        username: username,
        password: password,
      });
      const { id } = await User.findOne({
        where: {
          email: email,
        },
      });
      await Ticket.create({
        ticket: confirmationTicket,
        UserId: id,
      });
      const userJson = user.toJSON();
      res.send({ user: userJson, token: jwtSignUser(userJson) });
    } catch (error) {
      console.log(error);
    }
  },
};
