const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers

const bookRouter = require("./routes/Books");
const cardRouter = require("./routes/Cards");
const receivedBookRouter = require("./routes/ReceivedBooks");
const reservedBookRouter = require("./routes/ReservedBooks");
const usersRouter = require("./routes/Users");
app.use("/books", bookRouter);
app.use("/cards", cardRouter);
app.use("/receivedbooks", receivedBookRouter);
app.use("/reservedbooks", reservedBookRouter);
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
