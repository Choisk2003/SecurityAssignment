const mongoose = require("mongoose");
const http = require("http");
const url = require("url");

const CatSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number
});

var Cat = mongoose.model("Cat", CatSchema);

function getCatsList() {
  return Cat.find({});
}

function catsListTemplate(cats) {
  var catsList = "<ul>";
  for (let i = 0; i < cats.length; i++) {
    catsList =
      catsList +
      `<li>이름 : ${cats[i].name} 색 : ${cats[i].color} 나이: ${cats[i].age}</li>`;
  }
  catsList = catsList + "</ul>";
  return catsList;
}

var app = http.createServer(async function(request, response) {
  if (url.parse(request.url, true).pathname === "/") {
    const list = await getCatsList().then(list => catsListTemplate(list));
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
      </form>
      ${list}
    </body>
    </html>
    `;
    response.end(template);
  }
});

mongoose
  .connect("mongodb://localhost:27017/test", function() {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      console.log("Connected!!");
    });
  })
  .then(() => {
    app.listen(3000);
  });
