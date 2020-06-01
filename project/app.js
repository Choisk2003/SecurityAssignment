const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const accountRouter = require("./routes/account");
const indexRouter = require("./routes/index");

const dbUrl = "mongodb://localhost:27017/AfterReading";
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongod server");
});
mongoose.connect(dbUrl);

app.disable("x-powered-by");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "1p2o3i",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: dbUrl,
      collection: "sessions",
    }),
  })
);

app.use("/", indexRouter);
app.use("/sign", accountRouter);

app.listen(3000);
