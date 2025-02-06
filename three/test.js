function flattenArray(arr) {
  let result = [];

  function flatten(arr) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  }

  flatten(arr);
  return result;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6, [7, 8,10,11,[1,2,3]], 9]));


