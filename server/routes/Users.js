const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

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

    const accessToken = sign(
      { email: user.email, id: user.id },
      "importantsecret"
    );

    res.json(accessToken);
  });
});

module.exports = router;
