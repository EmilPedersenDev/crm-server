require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Init

const Port = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./controller/user")(app);
require("./controller/auth")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Connected!",
  });
});

app.listen(Port, () => {
  console.log(`Listening successful on ${Port}.`);
});
