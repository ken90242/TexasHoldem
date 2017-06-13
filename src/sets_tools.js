// get rid of ALL [target] in [arr]
// function getRid(target, arr) {
//   const ar = arr.filter(v => v !== target);

//   return ar;
// }

function aescendCompare(a, b) {
  let flag = 0;
  if (a > b) {
    flag = 1;
  } else if (a < b) {
    flag = -1;
  }
  return flag;
}

function random(min, max) {
  // if min=0 max=5  then output[0..4]
  let rMin = min;
  let rMax = max;
  if (!max) {
    rMax = min;
    rMin = 0;
  }

  const res = Math.floor(Math.random() * rMax) - rMin;
  return res;
}

function biggest(arr) {
  let res = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > res) res = arr[i];
  }

  return res;
}

function smallest(arr) {
  let res = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < res) res = arr[i];
  }

  return res;
}

const setsTools = {};
setsTools.biggest = biggest;
setsTools.smallest = smallest;
setsTools.aescendCompare = aescendCompare;
setsTools.random = random;
module.exports = setsTools;
