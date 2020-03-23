/*
async function test() {
  await foo(1, 200);
  await foo(2, 10);
}

function foo(num, sec){
  setTimeout(function() {
    console.log(num);
    resolve("..");
  }, sec);
}

test();

// 결과: 2
//       1
// async/await 는 Promise 방식을 사용하기 때문에 await로 동기적으로 만들고 싶은 함수는 Promise를 리턴해야 한다.
*/

async function test() {
  await foo(1, 2000);
  await foo(2, 100);
}

function foo(num, sec) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log(num);
      resolve("..");
    }, sec);
  });
}

test();
