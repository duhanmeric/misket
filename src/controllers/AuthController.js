const { User } = require("../models");
const { Ticket } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

jwtSignUser = (user) => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
};

module.exports = {
  async login(req, res) {
    try {
      const { userEmail, userPassword } = req.body;
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "The login info is incorrect. User not found.",
        });
      }
      if (user && !user.isActive) {
        return res.status(403).send({
          error: "User is not activated, check out your email.",
        });
      }
      const isPasswordValid = await user.comparePassword(userPassword);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Wrong password",
        });
      }
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (error) {
      console.log("backend" + error);
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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: "duhanmeric@gmail.com",
          pass: process.env.MAIL_PASS || "X25dhb3sq.",
        },
      });

      const mailOptions = {
        from: "duhanmeric@gmail.com",
        to: email,
        subject: "Account Verification",
        text: "That was easy!",
        html:
          '<p>Click <a href="https://misket.herokuapp.com/verification/' +
          confirmationTicket +
          '">here</a> to activate your account.</p>',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      return res.status(403).send({
        error: "Not Unique",
      });
    }
  },

  async verification(req, res) {
    try {
      const { confirmationTicket } = req.params;
      const { ticket, UserId } = await Ticket.findOne({
        where: {
          ticket: confirmationTicket,
        },
      });
      const activatedUser = await User.findOne({
        where: {
          id: UserId,
        },
      });
      activatedUser.isActive = true;
      await activatedUser.save();

      await Ticket.destroy({
        where: {
          ticket: confirmationTicket,
        },
      });

      res.send({ ticket, userInfo: { data: activatedUser.isActive } });
    } catch (error) {
      console.log(error);
    }
  },
};
