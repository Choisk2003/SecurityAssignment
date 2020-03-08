var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      var title = "Welcome";
      var description = "Hello World";
      var template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>${title}</title>
  </head>
  <body>
      <h1><a href="/">Welcome</a></h1>
      <ul>
        <li><a href="/?id=me">Me</a></li>
        <li><a href="/?id=you">You</a></li>
        <li><a href="/?id=us">Us</a></li>
      </ul>
      <h2>${title}</h2>
      <p>${description}</p>
  </body>
  </html>`;
      response.writeHead(200);
      response.end(template);
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
        var title = queryData.id;
        var template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>${title}</title>
  </head>
  <body>
      <h1><a href="/">Welcome</a></h1>
      <ul>
        <li><a href="/?id=me">Me</a></li>
        <li><a href="/?id=you">You</a></li>
        <li><a href="/?id=us">Us</a></li>
      </ul>
      <h2>It's about ${title}</h2>
      <p>${description}</p>
  </body>
  </html>`;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

app.listen(3000);
