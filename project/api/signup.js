const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const userSchema = require("../model/userSchema");
const users = mongoose.model("users", userSchema);

module.exports = async function (req, res) {
  userInfo = req.body;
  const emailPattern = /.+@[0-9a-z\-]+\.[a-z]+/i;
  if (emailPattern.test(userInfo.email)) {
    const findByEmail = await users.findOne({ email: userInfo.email });
    const findById = await users.findOne({ userId: userInfo.userid });
    if (findByEmail === null && findById === null) {
      users
        .create({
          email: userInfo.email,
          userName: userInfo.username,
          userId: userInfo.userid,
          password: userInfo.password,
          reports: [],
        })
        .then(() => res.end("well done"));
    } else {
      console.log("already exist");
      res.end("already exist");
    }
  } else {
    res.render("signup", { message: "잘못된 이메일 형식입니다." });
  }
};
