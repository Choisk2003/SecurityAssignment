const mongoose = require("mongoose");
const http = require("http");
const url = require("url");
const qs = require("querystring");

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
  var catsList = `
  <table style="width: 100%">
    <thead><tr><th>이름</th><th>색</th><th>나이</th><th></th></tr></thead>
      <tbody>`;
  for (let i = 0; i < cats.length; i++) {
    catsList =
      catsList +
      `
      <tr>
        <th>${cats[i].name}</th>
        <th>${cats[i].color}</th>
        <th>${cats[i].age}</th>
        <th><form action ="/delete" method="post"><input type="hidden" name="id" value="${cats[i]._id}"><input type="submit" value="삭제"></form></th>
      </tr>`;
  }
  catsList = catsList + "</tbody></table>";
  return catsList;
}

var app = http.createServer(async function(request, response) {
  let pathname = url.parse(request.url, true).pathname;
  if (pathname === "/") {
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
        <input type="text" name="name" placeholder="name">
        <input type="text" name="color" placeholder="color">
        <input type="text" name="age" placeholder="age">
        <input type="submit" value="upload">
      </form>
      ${list}
    </body>
    </html>
    `;
    response.end(template);
  } else if (pathname === "/input") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      body = qs.parse(body);
      Cat.create(
        { name: body.name, color: body.color, age: body.age },
        function(err, doc) {
          response.writeHead(302, { Location: `/` });
          response.end();
        }
      );
    });
  } else if (pathname === "/delete") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      body = qs.parse(body);
      Cat.deleteOne({ _id: body.id }, function(err, doc) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
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
