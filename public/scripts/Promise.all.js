Promise.myAll = function (promises) {
  return new Promise(function (resolve, reject) {
    const result = [];
    let resolvedCount = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result[index] = res;
          resolvedCount += 1;
          if (resolvedCount === promises.length) resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

// Test the custom Promise.all function
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 1");
  }, 1000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("resolved 2");
  }, 2000);
});

Promise.myAll([p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
