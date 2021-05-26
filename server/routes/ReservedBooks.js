const express = require("express");
const router = express.Router();
const { ReservedBooks, Books, Administrators } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfReservedBooks = await ReservedBooks.findAll();
  res.json(listOfReservedBooks);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const reservedBook = await ReservedBooks.findByPk(id);
  res.json(reservedBook);
});

router.get("/bookbyuser", validateToken, async (req, res) => {
  const books = await ReservedBooks.findAll({
    where: { userId: req.user.userId },
  });
  res.json(books);
});

router.delete("/deletebyuser/:isbn", validateToken, async (req, res) => {
  const book = await ReservedBooks.destroy({
    where: { userId: req.user.userId, isbn: req.params.isbn },
  }).catch((e) => {
    console.log(e);
  });
  const setAvailable = await Books.findOne({
    where: { isbn: req.params.isbn },
  });
  setAvailable.update({
    isReservation: 1,
  });
  res.json("Silme basarili");
});

router.post("/", validateToken, async (req, res) => {
  const reservedBook = req.body;
  const getBooksByUser = await ReservedBooks.findAll({
    where: { userId: req.user.userId },
  });
  const getBookType = await Books.findOne({
    where: { isbn: req.body.isbn },
  });
  const getAdminRules = await Administrators.findOne({
    where: { email: "yazmuhdeneme@gmail.com" },
  });

  console.log(getAdminRules);
  if (getBookType.isAvailable == 0) {
    if (req.user.userType == "Öğrenci" || req.user.userType == "Memur") {
      if (
        Object.keys(getBooksByUser).length ==
        getAdminRules.studentAndOfficerMaxBooksCount
      ) {
        res.json(
          `Toplamda rezerve ettiğiniz kitap sayısı en fazla ${getAdminRules.studentAndOfficerMaxBooksCount} olmalıdır`
        );
      } else if (getBookType.materialType == "Ders Kitabı") {
        res.json(
          "Ders Kitabı materyalini sadece öğretim üyeleri rezerve edebilir"
        );
      } else {
        await ReservedBooks.create(reservedBook).catch((e) => {
          console.log(e);
        });
        getBookType.update({
          isReservation: 0,
        });
        res.json(reservedBook);
      }
    }
    if (req.user.userType == "Öğretim Üyesi") {
      if (
        Object.keys(getBooksByUser).length ==
        getAdminRules.academicianMonthMaxBooksCount
      ) {
        res.json(
          `Toplamda rezerve ettiğiniz kitap sayısı en fazla ${getAdminRules.academicianMonthMaxBooksCount} olmalıdır`
        );
      } else {
        await ReservedBooks.create(reservedBook).catch((e) => {
          console.log(e);
        });
        getBookType.update({
          isReservation: 0,
        });
        res.json(reservedBook);
      }
    }
  } else {
    res.json("Kitap zaten kutuphanede mevcut");
  }
});

module.exports = router;
