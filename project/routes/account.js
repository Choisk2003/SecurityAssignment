const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("signin", { message: null }));
router.post("/", (req, res) => {
  require("../api/singin")(req, res);
});

router.get("/up", (req, res) => res.render("signup", { message: null }));
router.post("/up", (req, res) => {
  require("../api/signup")(req, res);
});

module.exports = router;
