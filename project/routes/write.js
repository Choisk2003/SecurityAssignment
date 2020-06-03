const router = require("express").Router();

router.post("/", (req, res) => {
  const request = JSON.parse(req.body.choose);
  res.render("write", {
    userName: req.session.userName,
    results: request,
  });
});

module.exports = router;
