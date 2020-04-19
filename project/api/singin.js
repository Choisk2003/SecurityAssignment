const mongoose = require("mongoose");
const userSchema = require("../model/userSchema");
const users = mongoose.model("users", userSchema);

module.exports = async function (req, res) {
  const loginInfo = req.body;
  const emailPattern = /.+@[0-9a-z\-]+\.[a-z]+/i;
  if (emailPattern.test(loginInfo.name)) {
    const findByEmail = await users.findOne({ email: loginInfo.name });
    if (findByEmail !== null) {
      if (findByEmail.password === loginInfo.password) {
        req.session.logined = true;
        req.session.userName = findByEmail.userName;
        req.session.save(() => res.redirect("/"));
      } else {
        res.render("signin", { message: "비밀번호가 틀렸습니다." });
      }
    } else {
      res.render("signin", { message: "가입되지 않은 이메일입니다." });
    }
  } else {
    const findById = await users.findOne({ userId: loginInfo.name });
    if (findById !== null) {
      if (findById.password === loginInfo.password) {
        req.session.logined = true;
        req.session.userName = findById.userName;
        res.redirect("/");
      } else {
        res.render("signin", { message: "비밀번호가 틀렸습니다." });
      }
    } else {
      res.render("signin", { message: "가입되지 않은 아이디입니다." });
    }
  }
};
