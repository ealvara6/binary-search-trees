const mergeSort = (arr) => {
  let newArr = [];
  if (arr.length < 2) {
    return arr;
  }
  const leftItem = mergeSort(arr.splice(0, arr.length / 2));
  const rightItem = mergeSort(arr);
  while (leftItem.length !== 0 && rightItem.length !== 0) {
    if (leftItem[0] < rightItem[0]) {
      newArr.push(leftItem.shift());
    } else {
      newArr.push(rightItem.shift());
    }
  }
  if (leftItem.length === 0) {
    newArr = newArr.concat(rightItem);
  } else {
    newArr = newArr.concat(leftItem);
  }
  return newArr;
};

export default mergeSort;
