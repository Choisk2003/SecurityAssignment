var http = require("http");
var url = require("url");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;
  if (_url == "/") {
    title = "Welcome";
  }
  response.writeHead(200);
  var template = `<!DOCTYPE html>
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
  </body>
  </html>`;
  response.end(template);
});

app.listen(3000);
