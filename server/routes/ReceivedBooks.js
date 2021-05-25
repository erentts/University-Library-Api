const express = require("express");
const router = express.Router();
const {
  ReceivedBooks,
  Books,
  Users,
  ReservedBooks,
  Administrators,
} = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const nodemailer = require("nodemailer");

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
  if (setAvailable.isReservation == 0) {
    const reservedBook = await ReservedBooks.findOne({
      where: { isbn: req.params.isbn },
    });
    const findUser = await Users.findOne({
      where: { userId: reservedBook.userId },
    });

    // SEND MAIL TO findUser.email

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yazmuhdeneme@gmail.com",
        pass: "123456Yazmuh",
      },
    });

    const mailOptions = {
      from: "yazmuhdeneme@gmail.com",
      to: findUser.email,
      subject: `Rezerve Edilen Kitap`,
      text: `Rezerve ettiginiz kitap kutuphaneye ulasmistir.Teslim alabilirsiniz..`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  }
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
  const getAdminRules = await Administrators.findOne({
    where: { email: "yazmuhdeneme@gmail.com" },
  });
  if (getBookType.isAvailable == 1) {
    if (req.user.userType == "Öğrenci" || req.user.userType == "Memur") {
      if (
        Object.keys(getBooksByUser).length ==
        getAdminRules.studentAndOfficerMaxBooksCount
      ) {
        res.json(
          `Toplamda sahip olduğunuz kitap sayısı en fazla ${getAdminRules.studentAndOfficerMaxBooksCount} olmalıdır.`
        );
      } else if (getBookType.materialType == "Ders Kitabı") {
        res.json(
          "Ders Kitabı materyalini sadece öğretim üyeleri alabilmektedir"
        );
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
      if (
        Object.keys(getBooksByUser).length ==
        getAdminRules.academicianMonthMaxBooksCount
      ) {
        res.json(
          `Toplamda sahip olduğunuz kitap sayısı en fazla ${getAdminRules.academicianMonthMaxBooksCount} olmalıdır.`
        );
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
  } else {
    res.json("Kitap baskasinda oldugu icin alamazsiniz");
  }
});

module.exports = router;
