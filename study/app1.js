var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateMain(title, list, body) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
  </head>
  <body>
    <h1><a href="/">Welcome</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>`;
}

function templateList(filelist) {
  var list = "<ul>";
  for (let i = 0; i < filelist.length; i++) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function(error, filelist) {
        var title = "Welcome";
        var description = "Hello World";

        var template = templateMain(
          title,
          templateList(filelist),
          `<h2>${title}</h2>${description}`
        );

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function(error, filelist) {
        fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
          var title = queryData.id;

          var template = templateMain(
            title,
            templateList(filelist),
            `<h2>${title}</h2>${description}`
          );

          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function(error, filelist) {
      var title = "Create";

      var template = templateMain(
        title,
        templateList(filelist),
        `<form action="/create_" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p><input type="submit"></p>
        </form>`
      );

      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_") {
    var body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      fs.writeFile(`data/${post.title}`, post.description, "utf8", function(
        err
      ) {
        response.writeHead(302, { Location: `/?id=${post.title}` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

app.listen(3000);
