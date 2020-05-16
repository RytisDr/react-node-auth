const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

//#############################################
/*
GET /users
GET /users/[userId]
POST /users
DELETE /users/[userId] -- (HTML) GET users/delete/[userId] 
PUT /users/[userId] -- update everything in the user object, except id
PATCH /users/[userId] -- change only some parts of the user
*/
//#############################################
//GET HERE

//#############################################
// LOGIN

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const users = await User.query().select().where({ email: email }).limit(1); //database query for user with the email specified, limit(1) stops the search after first match
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "Wrong email" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({});
      }
      if (!isSame) {
        return res.status(404).send({ response: "check the credentials" });
      } else {
        req.session.user = { email: user.email, id: user.id };
        return res.status(200).send({ response: "Logged-in" });
      }
    });
  } else {
    return res.status(404).send({ response: "Missing email or password" });
  }
});
//#############################################
//REGISTER USER

router.post("/users/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    if (password.length < 8) {
      ///Needs more validation; numbers, characters, captals etc.
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ email: email })
            .limit(1);
          if (existingUser[0]) {
            return res.status(400).send({ response: "User already exists" });
          } else {
            const newUser = await User.query().insert({
              first_name: firstName,
              last_name: lastName,
              email,
              password: hashedPassword,
            });
            return res
              .status(200)
              .send({ response: "User created with email " + newUser.email });
          }
        } catch (error) {
          return res.status(500).send({ response: "DB error" });
        }
      });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

module.exports = router;
