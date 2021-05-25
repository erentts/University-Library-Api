const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || "3001";

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers

const bookRouter = require("./routes/Books");
const cardRouter = require("./routes/Cards");
const receivedBookRouter = require("./routes/ReceivedBooks");
const reservedBookRouter = require("./routes/ReservedBooks");
const usersRouter = require("./routes/Users");
const adminRouter = require("./routes/Administrators");
app.use("/books", bookRouter);
app.use("/cards", cardRouter);
app.use("/receivedbooks", receivedBookRouter);
app.use("/reservedbooks", reservedBookRouter);
app.use("/auth", usersRouter);
app.use("/admin", adminRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
