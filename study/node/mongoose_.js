const mongoose = require("mongoose");
const http = require("http");
const url = require("url");
//DB 연동하는 과정에서 동기적인 문제가 있는것 같다. promise, async와 await에 대해 공부하고 해결할 필요가 있을 것 같다.
mongoose.connect("mongodb://localhost:27017/test", function() {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Connected!!");
  });
});

const CatSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number
});

var Cat = mongoose.model("Cat", CatSchema);

var listTemplate = function() {
  Cat.find({}, function(err, cats) {
    console.log(cats);
    return cats;
  });
};

var app = http.createServer(function(request, response) {
  if (url.parse(request.url, true).pathname === "/") {
    const list = listTemplate();
    const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Mongoose</title>
    </head>
    <body>
      <form action="/input" method="post">
        <input type="text">
        <input type="submit" value="upload">
        ${list}
      </form>
    </body>
    </html>
    `;
    response.end(template);
  }
});

app.listen(3000);
