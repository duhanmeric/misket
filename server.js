const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models");
const path = require("path");
const config = require("./src/config/config");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");

const app = express();
app.use(express.json());
app.use(cors());

require("./src/routes")(app);

const staticFileMiddleware = serveStatic(path.join(__dirname + "/build"));
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(staticFileMiddleware);

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/build/index.html"));
});

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`server up and started on port ${config.port}`);
});
