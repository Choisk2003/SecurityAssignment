const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const userSchema = require("../model/userSchema");
const users = mongoose.model("users", userSchema);

module.exports = async function (req, res) {
  userInfo = req.body;
  const findByEmail = await users.findOne({ email: userInfo.email }); //정규표현식으로 확인 필요
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
};
