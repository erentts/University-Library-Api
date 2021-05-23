const express = require("express");
const router = express.Router();
const { ReceivedBooks, Books } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const e = require("express");

router.get("/", async (req, res) => {
  const listOfCards = await ReceivedBooks.findAll();
  res.json(listOfCards);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const receivedBook = await ReceivedBooks.findByPk(id);
  res.json(receivedBook);
});

router.get("/bookbyuser", validateToken, async (req, res) => {
  const books = await ReceivedBooks.findAll({
    where: { userId: req.user.userId },
  });
  res.json(books);
});

router.delete("/deletebyuser/:isbn", validateToken, async (req, res) => {
  const book = await ReceivedBooks.destroy({
    where: { userId: req.user.userId, isbn: req.params.isbn },
  }).catch((e) => {
    console.log(e);
  });
  const setAvailable = await Books.findOne({
    where: { isbn: req.params.isbn },
  });
  setAvailable.update({
    isAvailable: 1,
  });
  res.json("Silme basarili");
});

router.post("/", validateToken, async (req, res) => {
  const receivedBook = req.body;
  const getBooksByUser = await ReceivedBooks.findAll({
    where: { userId: req.user.userId },
  });
  const getBookType = await Books.findOne({
    where: { isbn: req.body.isbn },
  });

  if (req.user.userType == "Öğrenci" || req.user.userType == "Memur") {
    if (Object.keys(getBooksByUser).length == 3) {
      res.json("Toplamda sahip olduğunuz kitap sayısı en fazla 3 olmalıdır.");
    } else if (getBookType.materialType == "Ders Kitabı") {
      res.json("Ders Kitabı materyalini sadece öğretim üyeleri alabilmektedir");
    } else if (getBookType.isAvailable == 0) {
      res.json("Bu kitap başka bir kişidedir.");
    } else {
      await ReceivedBooks.create(receivedBook).catch((e) => {
        console.log(e);
      });
      getBookType.update({
        isAvailable: 0,
      });
      res.json(receivedBook);
    }
  }
  if (req.user.userType == "Öğretim Üyesi") {
    if (Object.keys(getBooksByUser).length == 6) {
      res.json("Toplamda sahip olduğunuz kitap sayısı en fazla 6 olmalıdır.");
    } else if (getBookType.isAvailable == 0) {
      res.json("Bu kitap başka bir kişidedir.");
    } else {
      await ReceivedBooks.create(receivedBook).catch((e) => {
        console.log(e);
      });
      getBookType.update({
        isAvailable: 0,
      });
      res.json(receivedBook);
    }
  }
});

module.exports = router;
