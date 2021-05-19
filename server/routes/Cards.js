const express = require("express");
const router = express.Router();
const { Cards } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfCards = await Cards.findAll();
  res.json(listOfCards);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const card = await Cards.findByPk(id);
  res.json(card);
});

router.post("/", validateToken, async (req, res) => {
  const card = req.body;
  await Cards.create(card).catch((e) => {
    console.log(e);
  });
  res.json(card);
});

module.exports = router;
