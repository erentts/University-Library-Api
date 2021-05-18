const express = require("express");
const router = express.Router();
const { ReservedBooks } = require("../models");

router.get("/", async (req, res) => {
  const listOfReservedBooks = await ReservedBooks.findAll();
  res.json(listOfReservedBooks);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const reservedBook = await ReservedBooks.findByPk(id);
  res.json(reservedBook);
});

router.post("/", async (req, res) => {
  const reservedBook = req.body;
  await ReservedBooks.create(reservedBook).catch((e) => {
    console.log(e);
  });
  res.json(reservedBook);
});

module.exports = router;
