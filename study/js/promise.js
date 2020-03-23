/*
//이런식으로 Promise를 선언 할 경우 후에 호출해도 계속해서 resolve 또는 reject가 실행될 것이다.
var promise_ = new Promise(function(resolve, reject) {
  if (Math.floor(Math.random() * (2 - 0))) {
    resolve("Succed!");
  } else {
    reject(Error("Failed.."));
  }
});

promise_.then(
  function(text) {
    console.log(text);
  },
  function(err) {
    console.error(err);
  }
);
*/

/*
//함수에서 return 해주는 형식으로도 사용함
new Promise(function(resolve, reject) {
  if (Math.floor(Math.random() * (2 - 0))) {
    resolve("Succed!");
  } else {
    reject(Error("Failed.."));
  }
})
  .then(console.log)
  .catch(console.log);
*/
