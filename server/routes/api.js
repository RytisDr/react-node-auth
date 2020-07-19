const express = require("express");
const app = express();
const usersRoute = require(__dirname + "/users.js");
app.use("/users", usersRoute);

module.exports = app;
