var http = require("http");
var url = require("url");

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  console.log(queryData.name);
  if (queryData.name) {
    response.end(`Hello ${queryData.name}`);
  } else {
    response.end(`Hello World`);
  }
});

app.listen(3000);
