module.exports = function (info) {
  {
    let template = `<table class="results">
    `;
    for (let i = 0; i < info.length; i++) {
      const one = {
        title: info[i].title,
        author: info[i].author,
        image: info[i].image,
      };
      template += `<tr><td><img class="resultImg" src="${one.image}"></td><td>${one.title}</td><td>${one.author}</td></tr>
`;
    }
    template += `</table>`;
    return template;
  }
};
