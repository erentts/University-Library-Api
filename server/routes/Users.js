const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");

const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

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
      {
        email: user.email,
        id: user.id,
        userId: user.userId,
        userType: user.userType,
      },
      "importantsecret"
    );

    res.json({
      token: accessToken,
      email: user.email,
      id: user.id,
      userId: user.userId,
      userType: user.userType,
    });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

module.exports = router;
