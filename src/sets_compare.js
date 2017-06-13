import setsConvert from './sets_convert';
import setsTools from './sets_tools';
import classify from './sets_classify';

/* if [val_a] > [val_b] : 1
 *  [val_a] = [val_b] : 0
 *  [val_a] < [val_b] : -1
 */
function compareVal(valA, valB) {
  const a = valA;
  const b = valB;

  const flag = setsTools.aescendCompare(a, b);

  return flag;
}


function empowerAce(v) {
  // console.log(`type:${typeof v}`)
  const vv = v === 1 ? v + 13 : v;
  // console.log(`empower result:${_v}`)
  return vv;
}

// get rid of ALL [target] in [arr]
function getRid(target, arr) {
  const ar = arr.filter(v => v !== target);
  return ar;
}

// get largest value which appears [counts] times in [arr]
function getSameVal(counts, arr) {
  const obj = {};
  const valArr = [];

  arr.forEach((v) => {
    obj[v] = obj[v] || 0;
    obj[v] += 1;
  });

  Object.keys(obj).forEach((key) => {
    if (obj[key] === counts) {
      const keyInt = parseInt(key, 10);
      valArr.push(empowerAce(keyInt));
    }
  });
  // console.log(`val_arr:${val_arr}`)
  const res = setsTools.biggest(valArr);
  // console.log(`res:${res}`)
  return res;
}


/* Compare the level between cards arrays.
 *
 * |Name   |Type  |Desc               |
 * |-------|------|-------------------|
 * |...arr1|array |Array of cards(Raw)|
 * |...arr2|array |Array of cards(Raw)|
 * |return |int   |comparison result  |
 *
 * ```javascript
 * fn([RoyalFlush],[OnePair])
 * // -> 1
 * fn([RoyalFlush],[RoyalFlush])
 * // (&& Same suit)
 * // -> 0
 * fn([OnePair],[RoyalFlush])
 * // -> -1
 * ```
 */
function compareInHighCard(valArrA, valArrB) {
  let flag;
  // console.log(`[highcard] valArrA:${valArrA},valArrB:${valArrB}`)
  if (valArrA.length === 0 && valArrB.length === 0) flag = 0;
  const ArrA = valArrA.map(v => empowerAce(v));
  const ArrB = valArrB.map(v => empowerAce(v));
  ArrA.sort(compareVal);
  ArrB.sort(compareVal);
  for (let i = ArrA.length - 1; i >= 0; i -= 1) {
    flag = compareVal(ArrA[i], ArrB[i]);
    if (flag !== 0) {
      break;
    }
  }

  return flag;
}

function compareInPair(valArrA, valArrB) {
  let flag;
  const aBiggest = getSameVal(2, valArrA);
  const bBiggest = getSameVal(2, valArrB);
  const ArrA = getRid(aBiggest, valArrA);
  const ArrB = getRid(bBiggest, valArrB);
  // console.log(`[pair]_arra:${ArrA},_arrb:${ArrB}`)
  flag = compareVal(aBiggest, bBiggest);
  // console.log(`aBiggest:${aBiggest}, bBiggest:${bBiggest}`)
  if (flag === 0) {
    flag = compareInHighCard(ArrA, ArrB);
  }
  return flag;
}

function compareInTwoPair(valArrA, valArrB) {
  let flag;
  const aBiggest = getSameVal(2, valArrA);
  const bBiggest = getSameVal(2, valArrB);
  const ArrA = getRid(aBiggest, valArrA);
  const ArrB = getRid(bBiggest, valArrB);

  flag = compareVal(aBiggest, bBiggest);

  if (flag === 0) {
    flag = compareInHighCard(ArrA, ArrB);
  }
  return flag;
}

function compareInThreeKind(valArrA, valArrB) {
  let flag;
  const aBiggest = getSameVal(3, valArrA);
  const bBiggest = getSameVal(3, valArrB);
  const ArrA = getRid(aBiggest, valArrA);
  const ArrB = getRid(bBiggest, valArrB);

  flag = compareVal(aBiggest, bBiggest);

  if (flag === 0) {
    flag = compareInHighCard(ArrA, ArrB);
  }
  return flag;
}

function compareInStraight(valArrA, valArrB) {
  const ArrA = valArrA.slice().sort(compareVal);
  const ArrB = valArrB.slice().sort(compareVal);
  const aBiggest = ArrA[1] === 10 ? empowerAce(1) : setsTools.biggest(ArrA);
  const bBiggest = ArrB[1] === 10 ? empowerAce(1) : setsTools.biggest(ArrB);

  const flag = compareVal(aBiggest, bBiggest);

  return flag;
}

function compareInFlush(valArrA, valArrB) {
  return compareInHighCard(valArrA, valArrB);
}

function compareInFullHouse(valArrA, valArrB) {
  const aBiggest = getSameVal(3, valArrA);
  const bBiggest = getSameVal(3, valArrB);
  const ArrA = getRid(aBiggest, valArrA);
  const ArrB = getRid(bBiggest, valArrB);
  // console.log(`_arra:${ArrA},_arrb:${ArrB}`)

  let flag = compareVal(aBiggest, bBiggest);

  if (flag === 0) {
    flag = compareInPair(ArrA, ArrB);
  }
  return flag;
}

function compareInFourKind(valArrA, valArrB) {
  let flag;
  const aBiggest = getSameVal(4, valArrA);
  const bBiggest = getSameVal(4, valArrB);
  const ArrA = getRid(aBiggest, valArrA);
  const ArrB = getRid(bBiggest, valArrB);

  // console.log(`aBiggest:${aBiggest},bBiggest:${bBiggest}`)
  flag = compareVal(aBiggest, bBiggest);

  if (flag === 0) {
    flag = compareInHighCard(ArrA, ArrB);
  }
  return flag;
}

function compareInStraightFlush(valArrA, valArrB) {
  const aBiggest = setsTools.biggest(valArrA);
  const bBiggest = setsTools.biggest(valArrB);
  // console.log(`aBiggest:${aBiggest},bBiggest:${bBiggest}`)
  const flag = compareVal(aBiggest, bBiggest);
  return flag;
}

function compareInRoyalFlush(valArrA, valArrB) {
  if (!valArrA || !valArrB) return false;
  return 0;
}

function compare(NumArrA, NumArrB) {
  const aLvL = classify(NumArrA);
  const bLvL = classify(NumArrB);
  let flag = 1;
  if (aLvL < bLvL) {
    flag = -1;
  } else if (aLvL === bLvL) {
    const valArrA = NumArrA.map(num => setsConvert.getCard(num).val);
    const valArrB = NumArrB.map(num => setsConvert.getCard(num).val);
    // console.log(`valArrA:${valArrA},valArrB:${valArrB}`)
    switch (aLvL) {
      case 0:
        // console.log(`HighCard`)
        flag = compareInHighCard(valArrA, valArrB);
        break;
      case 1:
        // console.log(`Pair`)
        flag = compareInPair(valArrA, valArrB);
        break;
      case 2:
        // console.log(`TwoPair`)
        flag = compareInTwoPair(valArrA, valArrB);
        break;
      case 3:
        // console.log(`ThreeKind`)
        flag = compareInThreeKind(valArrA, valArrB);
        break;
      case 4:
        // console.log(`Straight`)
        flag = compareInStraight(valArrA, valArrB);
        break;
      case 5:
        // console.log(`Flush`)
        flag = compareInFlush(valArrA, valArrB);
        break;
      case 6:
        // console.log(`FullHouse`)
        flag = compareInFullHouse(valArrA, valArrB);
        break;
      case 7:
        // console.log(`FourKind`)
        flag = compareInFourKind(valArrA, valArrB);
        break;
      case 8:
        // console.log(`StraightFlush`)
        flag = compareInStraightFlush(valArrA, valArrB);
        break;
      case 9:
        // console.log(`RoyalFlush`)
        flag = compareInRoyalFlush(valArrA, valArrB);
        break;
      default:
        break;
    }
  }
  return flag;
}

export default compare;
