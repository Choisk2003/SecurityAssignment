const router = require("express").Router();

router.post("/", (req, res) => {
  const request = JSON.parse(req.body.choose);
  res.render("write", {
    results: request,
  });
});

router.post("/upload", (req, res) => {});

module.exports = router;
