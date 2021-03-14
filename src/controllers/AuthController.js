const { User } = require("../models");
const { Ticket } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: "duhanmeric@gmail.com",
          pass: "X25dhb3sq.",
        },
      });

      const mailOptions = {
        from: "duhanmeric@gmail.com",
        to: email,
        subject: "Account Verification",
        text: "That was easy!",
        html:
          '<p>Click <a href="http://localhost:3000/verification/' +
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
      console.log(error);
    }
  },

  async verification(req, res) {
    try {
      const { confirmationTicket } = req.params;
      const { ticket } = await Ticket.findOne({
        where: {
          ticket: confirmationTicket,
        },
      });
      res.send(ticket);
    } catch (error) {
      console.log(error);
    }
  },
};
