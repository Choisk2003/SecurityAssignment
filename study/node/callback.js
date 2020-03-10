//시간이 오래걸리지만 뒤의 코드에 영향을 끼치는 함수가 비동기적으로 작동할 경우 callback을 활용하여 처리할 수 있다.

function slowfunc(callback) {
  callback();
}

slowfunc(function() {
  console.log("A");
});
