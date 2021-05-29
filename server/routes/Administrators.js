const express = require("express");
const router = express.Router();
const { Administrators } = require("../models");
const bcrypt = require("bcryptjs");

const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const {
    email,
    password,
    name,
    surname,
    userType,
    studentAndOfficerMonth,
    academicianMonth,
    studentAndOfficerMaxBooksCount,
    academicianMonthMaxBooksCount,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Administrators.create({
      email: email,
      password: hash,
      name,
      surname,
      userType,
      studentAndOfficerMonth,
      academicianMonth,
      studentAndOfficerMaxBooksCount,
      academicianMonthMaxBooksCount,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Administrators.findOne({ where: { email: email } });

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
        userType: user.userType,
      },
      "importantsecret"
    );

    res.json({
      token: accessToken,
      email: user.email,
      id: user.id,
      userType: user.userType,
    });
  });
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const administrators = await Administrators.findByPk(id);
  res.json(administrators);
});

router.get("/", async (req, res) => {
  const administrators = await Administrators.findAll();
  res.json(administrators);
});

router.put("/update/:id", validateToken, async (req, res) => {
  const {
    studentAndOfficerMonth,
    academicianMonth,
    studentAndOfficerMaxBooksCount,
    academicianMonthMaxBooksCount,
  } = req.body;
  const id = req.params.id;
  const administrators = await Administrators.findByPk(id);

  administrators.update({
    studentAndOfficerMonth: studentAndOfficerMonth,
    academicianMonth: academicianMonth,
    studentAndOfficerMaxBooksCount: studentAndOfficerMaxBooksCount,
    academicianMonthMaxBooksCount: academicianMonthMaxBooksCount,
  });

  res.json("Güncelleme başarıyla gerçekleşti");
});

module.exports = router;
