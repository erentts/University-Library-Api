const express = require("express");
const router = express.Router();
const { Books } = require("../models");
const Op = require("sequelize").Op;
router.get("/", async (req, res) => {
  const listOfBooks = await Books.findAll(); // findAll : sequalize method
  res.json(listOfBooks);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Books.findByPk(id);
  res.json(book);
});

router.get("/magazines/", async (req, res) => {
  const listofMagazines = await Books.findAll({
    where: { materialType: "Dergi" },
  });
  res.json(listofMagazines);
});

router.get("/onlybooks/", async (req, res) => {
  const listofBooks = await Books.findAll({
    where: {
      materialType: {
        [Op.ne]: "Dergi",
      },
    },
  });
  res.json(listofBooks);
});

router.post("/", async (req, res) => {
  const book = req.body;
  await Books.create(book).catch((e) => {
    console.log(e);
  });
  res.json(book);
});

module.exports = router;
