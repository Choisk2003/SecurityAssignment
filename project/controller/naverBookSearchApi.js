const request = require("request");
const NAVER_CLIENT_ID = "TRFNgiDKqvNEWMurpfQW";
const NAVER_CLIENT_SECRET = "MJZVzKDkGZ";
const url = "https://openapi.naver.com/v1/search/book_adv.json";

module.exports = function (book, author) {
  return new Promise((resolve, reject) => {
    const option = {
      d_titl: book,
      d_auth: author,
    };

    request.get(
      {
        uri: url,
        qs: option,
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
      },
      function (err, res, body) {
        const info = JSON.parse(body);
        if (info.display === 0) {
          resolve(`검색한 단어를 확인 후 다시 검색해주세요.`);
        } else {
          let results = [];
          for (let i = 0; i < info.display; i++) {
            results[i] = {
              title: info.items[i].title,
              author: info.items[i].author,
              image: info.items[i].image,
            };
          }
          resolve(results);
        }
      }
    );
  });
};
