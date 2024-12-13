require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;
const path = require("path");
const {
  handleUserSignup,
  handleUserLogin,
  handleUserLogin2,
  handleUserSignup2,
  Logggedin,
} = require("./controllers/user");
const {restrictToLoggedInUserOnly} = require("./middleware/auth");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./controllers/views"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/login", handleUserLogin2);
app.get("/home", Logggedin);
app.get("/signup", handleUserSignup2);
app.post("/signup", handleUserSignup);
app.post("/login", handleUserLogin);

//middleware or to set router

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
       console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
