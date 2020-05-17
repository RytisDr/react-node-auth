const express = require("express");
const app = express();
//Additional security plugin ("not a silver bullet" though)
const helmet = require("helmet");
//CORS
const cors = require("cors");
// Initialize express-session
const session = require("express-session");
// Knex session store
const KnexSessionStore = require("connect-session-knex")(session);
// Secret key for session
const key = require("./config/key");

app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

/* Setup the database */

const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);
//initializes KnexSessionStore
const store = new KnexSessionStore({ knex });

//use CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//use helmet
app.use(helmet());
// Implements express-session
app.use(
  session({
    secret: key.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
    },
    store: store,
  })
);

// API routes
const apiRoutes = require(__dirname + "/routes/api");
app.use("/api", apiRoutes);

/* Start the server, KEEP AT THE BOTTOM  */
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error running Express");
  }
  console.log("Server is running on port", server.address().port);
});
