const express = require("express");
const app = express();

const signinRoute = require("./routes/signin");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", signinRoute);

app.listen(3000);
