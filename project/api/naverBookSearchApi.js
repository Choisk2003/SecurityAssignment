const request = require("request");
const NAVER_CLIENT_ID = "TRFNgiDKqvNEWMurpfQW";
const NAVER_CLIENT_SECRET = "MJZVzKDkGZ";
const url = "https://openapi.naver.com/v1/search/book_adv.json";

module.exports = function(option) {
  request.get(
    {
      uri: url,
      qs: option,
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
      }
    },
    function(err, res, body) {
      return JSON.parse(body);
    }
  );
};

/*
options
display: max 100, default 10, 검색 결과 출력 건수 지정
sort: sim(유사도순), date(출간일순), count(판매량순)   
d_titl: 책 제목 검색
d_auth: 저자명 검색
*/
