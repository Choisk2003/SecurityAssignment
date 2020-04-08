const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("signin"));
router.post("/", (req, res) => res.render("signin"));

router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", (req, res) => {
  require("../api/signup")(req, res);
});

module.exports = router;
