const express = require("express");
const app = express();
const router = require("express").Router();
const usersRoute = require(__dirname + "/users.js");
app.use("/users", usersRoute);

module.exports = app;
