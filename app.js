const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
const userRoutes = require("./modules/user/user.routes");
const notesRoutes = require("./modules/notes/notes.routes");

app.use("/app/user", userRoutes);
app.use("/app/sites", notesRoutes);

app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "Welcome to WorkIndia's test!",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server started at port : " + process.env.PORT);
});
