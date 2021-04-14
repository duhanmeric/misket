const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");
const config = require("./src/config/config");

const app = express();
app.use(express.json());
app.use(cors());

require("./src/routes")(app);

app.use(express.static("client/build"));

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`server up and started on port ${config.port}`);
});
