import compare from './sets_compare';
import setsTools from './sets_tools';
import setsConvert from './sets_convert';

function cardConstruct() {
  const res = [];

  for (let i = 0; i < 52; i += 1) {
    res[i] = i;
  }
  return res;
}

function* randomPopOne() {
  const numArr = cardConstruct();
  let res;
  let arr;
  let obj;
  let len;
  let randIdx;

  while (numArr.length > 0) {
    len = numArr.length;
    randIdx = setsTools.random(len);

    arr = numArr.splice(randIdx, 1);
    obj = setsConvert.getCard(arr.pop());
    res = { suit: obj.suit, val: obj.val, length: numArr.length };

    yield res;
  }
}

function PickAllFive(numArr) {
  const possible = [];
  const len = numArr.length;

  if (len === 7) {
    for (let i = 0; i <= len - 2; i += 1) {
      for (let j = i + 1; j <= len - 1; j += 1) {
        const pick = numArr.filter(v => v !== numArr[i] && v !== numArr[j]);
        possible.push(pick);
      }
    }
  } else if (len === 6) {
    for (let i = 0; i < 5; i += 1) {
      const pick = numArr.filter(v => v !== numArr[i]);
      possible.push(pick);
    }
  } else if (len === 5) {
    possible.push(numArr);
  } else {
    return false;
  }
  return possible;
}

function getBestSet(numArr) {
  const possible = PickAllFive(numArr);
  let best = possible[0];
  for (let i = 1; i < possible.length; i += 1) {
    if (compare(possible[i], best) === 1) {
      best = possible[i];
    }
  }
  return best;
}

export { randomPopOne as Poker, getBestSet };
