const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.logined !== undefined) {
    res.render("home", { userName: req.session.userName });
  } else {
    res.redirect("/sign");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sign");
});
module.exports = router;
