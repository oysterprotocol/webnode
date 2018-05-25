const randomNumber = (min, max) => {
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);

  return array[0] % (max - min) + min;
};

const randomArray = (min, max) => {
  const diff = max - min;
  let newArray = [];
  while (newArray.length !== diff) {
    let array = new Uint32Array(diff);
    window.crypto.getRandomValues(array);
    array.map((item, index) => {
      const compute = item % (max - min) + min;
      if (!newArray.includes(compute)) {
        newArray.push(compute);
      }
    });
  }

  return newArray;
}

export default { randomNumber, randomArray };