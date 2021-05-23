const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "erentutus56@gmail.com",
    pass: "1100Erenn",
  },
});

const mailOptions = {
  // Ben domain'imi yandex'e bağladığım için cagatay.me olarak belirttim.
  from: "erentutus56@gmail.com",
  to: "erentutus56@gmail.com",
  subject: `Rezerve Edilen Kitap`,
  text: `Rezerve ettiginiz kitap kutuphaneye ulasmistir.Teslim alabilirsiniz..`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});
