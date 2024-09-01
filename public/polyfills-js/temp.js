Promise.myAll = function (promises) {
    return new Promise(function (resolve, reject) {
      let result = [];
      let total = 0;
  
      promises.forEach((item, index) => {
        item
          .then((res) => {
            result[index] = res;
            total++;
            if (total === promises.length) resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
};