var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var sanitizeHtml = require("sanitize-html");
var template = require("./lib/template.js");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function(error, filelist) {
        var title = "Welcome";
        var description = "Hello World";

        response.writeHead(200);
        response.end(
          template.main(
            title,
            template.list(filelist),
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          )
        );
      });
    } else {
      fs.readdir("./data", function(error, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags: ["h1"]
          });
          response.writeHead(200);
          response.end(
            template.main(
              sanitizedTitle,
              template.list(filelist),
              `
              <h2>${sanitizedTitle}</h2>
              <p>
                ${sanitizedDescription}
              </p>
              `,
              `
              <a href="/create">create</a>  <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="/delete_" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="Delete">
              </form>`
            )
          );
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function(error, filelist) {
      var title = "Create";
      response.writeHead(200);
      response.end(
        template.main(
          title,
          template.list(filelist),
          `<form action="/create_" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit" value="Create"></p>
          </form>`,
          ``
        )
      );
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
  } else if (pathname === "/update") {
    fs.readdir("./data", function(error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
        var title = "Update " + queryData.id;

        response.writeHead(200);
        response.end(
          template.main(
            title,
            template.list(filelist),
            `
            <form action="/update_" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <p><input type="text" name="title" placeholder="title" value="${queryData.id}"></p>
              <p><textarea name="description" placeholder="description">${description}</textarea></p>
              <p><input type="submit" value="Update"></p>
            </form>`,
            ``
          )
        );
      });
    });
  } else if (pathname === "/update_") {
    var body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      fs.rename(`data/${post.id}`, `data/${post.title}`, function(err) {
        var filteredId = path.parse(post.id).base;
        fs.writeFile(`data/${filteredId}`, post.description, "utf8", function(
          err
        ) {
          response.writeHead(302, { Location: `/?id=${post.title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_") {
    var body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      var post = qs.parse(body);
      var filteredId = path.parse(post.id).base;
      fs.unlink(`data/${filteredId}`, function(err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

app.listen(3000);
