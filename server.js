const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");
const path = require("path");
const config = require("./src/config/config");

const app = express();
app.use(express.json());
app.use(cors());

require("./src/routes")(app);

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "./build")));
  res.render(path.join(__dirname, "./build/index.html"));
});

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`server up and started on port ${config.port}`);
});
