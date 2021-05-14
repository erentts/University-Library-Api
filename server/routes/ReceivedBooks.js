const express = require("express");
const router = express.Router();
const { ReceivedBooks } = require("../models");

router.get("/", async (req, res) => {
  const listOfCards = await ReceivedBooks.findAll();
  res.json(listOfCards);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const receivedBook = await ReceivedBooks.findByPk(id);
  res.json(receivedBook);
});

router.post("/", async (req, res) => {
  const receivedBook = req.body;
  await ReceivedBooks.create(receivedBook).catch((e) => {
    console.log(e);
  });
  res.json(receivedBook);
});

module.exports = router;
