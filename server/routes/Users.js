const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

/*router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll(); // findAll : sequalize method
  res.json(listOfUsers);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = req.body;
  await Users.create(user).catch((e) => {
    console.log(e);
  });
  res.json(user);
});*/
router.post("/", async (req, res) => {
  const {
    username,
    password,
    userId,
    name,
    surname,
    userType,
    reservedBooksCount,
    receivedBooksCount,
    email,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      userId,
      name,
      surname,
      userType,
      reservedBooksCount,
      receivedBooksCount,
      email,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "User does not exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Email and Password Combination" });
    }

    res.json("YOU LOGGED IN !");
  });
});

module.exports = router;
