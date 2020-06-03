const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.logined === true) {
    res.render("home", {
      userName: req.session.userName,
      results: undefined,
      repeat: undefined,
    });
  } else {
    res.redirect("/sign");
  }
});

router.post("/", (req, res) => {
  const result = JSON.parse(req.body.results);
  res.render("home", {
    userName: req.session.userName,
    results: result,
    repeat: result.length,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/sign");
});

router.get("/booksearch", async (req, res) => {
  const results = JSON.stringify(
    await require("../controller/naverBookSearchApi")(
      req.query.book,
      req.query.author
    )
  );
  res.send(`<form id="send" method="post" action="/"><input type="hidden" name="results" value='${results}'></form>
            <script>document.getElementById("send").submit()</script>`);
});

module.exports = router;
