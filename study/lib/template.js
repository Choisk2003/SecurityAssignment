var template = {
  main: function(title, list, body, control) {
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
        ${control}
        ${body}
      </body>
      </html>`;
  },
  list: function(filelist) {
    var list = "<ul>";
    for (let i = 0; i < filelist.length; i++) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + "</ul>";
    return list;
  }
};
module.exports = template;
