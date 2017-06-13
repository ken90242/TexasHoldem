import setsConvert from './sets_convert';
import setsTools from './sets_tools';

function countObjectConstruct(valArr) {
  const obj = {};
  valArr.forEach((v) => {
    obj[v] = obj[v] || 0;
    obj[v] += 1;
  });
  return obj;
}
function empowerAce(v) {
  // console.log(`type:${typeof v}`)
  const vv = v === 1 ? v + 13 : v;
  // console.log(`empower result:${_v}`)
  return vv;
}

function isPair(NumArr) {
  let flag = false;
  const valArr = NumArr.map(v => setsConvert.getCard(v).val);
  const co = countObjectConstruct(valArr);
  // console.log(`valArr:${valArr},obj:`)
  // console.log(co)
  Object.keys(co).forEach((key) => {
    if (co[key] === 2) flag = true;
  });
  return flag;
}

function isTwoPair(NumArr) {
  let flag = false;
  const valArr = NumArr.map(v => setsConvert.getCard(v).val);
  const co = countObjectConstruct(valArr);
  let pairCounts = 0;

  Object.keys(co).forEach((key) => {
    if (co[key] === 2) pairCounts += 1;
  });
  if (pairCounts === 2) flag = true;
  return flag;
}

function isThreeKind(NumArr) {
  let flag = false;
  const valArr = NumArr.map(v => setsConvert.getCard(v).val);
  const co = countObjectConstruct(valArr);
  // console.log(co)
  Object.keys(co).forEach((key) => {
    if (co[key] === 3) flag = true;
  });
  return flag;
}

function isStraight(NumArr) {
  let flag = true;
  const valArr = NumArr.map(v => empowerAce(setsConvert.getCard(v).val));
  const NotAllowed = [[2, 11], [3, 12], [4, 13]];
  NotAllowed.forEach((arr) => {
    if (arr.every(v => valArr.indexOf(v) !== -1)) {
      flag = false;
    }
  });
  // console.log(`flag1:${flag}`)
  valArr.sort(setsTools.aescendCompare);
  for (let i = 1; i < valArr.length; i += 1) {
    if (valArr[i] - valArr[i - 1] !== 1) {
      flag = false;
      break;
    }
  }
  // console.log(`flag2:${flag}`)
  if (valArr === [2, 3, 4, 5, 14]) flag = true;
  // console.log(`flag3:${flag}`)
  return flag;
}

function isFlush(NumArr) {
  // console.log(`NumArr:${NumArr}, NumArr[0]:${NumArr[0]}`);
  const suit = setsConvert.getCard(NumArr[0]).suit;
  const flag = NumArr.every(num => suit === setsConvert.getCard(num).suit);

  return flag;
}

function isFullHouse(NumArr) {
  let flag = false;
  const valArr = NumArr.map(v => setsConvert.getCard(v).val);
  const co = countObjectConstruct(valArr);
  let threeCount = 0;
  let pairCount = 0;

  Object.keys(co).forEach((key) => {
    if (co[key] === 2) {
      pairCount += 1;
    } else if (co[key] === 3) {
      threeCount += 1;
    }
  });
  if (pairCount === 1 && threeCount === 1) flag = true;
  return flag;
}

function isFourKind(NumArr) {
  let flag = false;
  const valArr = NumArr.map(v => setsConvert.getCard(v).val);
  const co = countObjectConstruct(valArr);

  Object.keys(co).forEach((key) => {
    if (co[key] === 4) flag = true;
  });
  return flag;
}

function isStraightFlush(NumArr) {
  return (isFlush(NumArr) && isStraight(NumArr));
}

function isRoyalFlush(NumArr) {
  if (!isStraightFlush(NumArr)) return false;
  let flag = false;
  const valArr = NumArr.map(v => empowerAce(setsConvert.getCard(v).val));
  valArr.sort(setsTools.aescendCompare);
  if (setsTools.smallest(valArr) === 10) flag = true;
  return flag;
}

function classify(NumArr) {
  const setsLevel = {
    HighCard: 0,
    Pair: 1,
    TwoPair: 2,
    ThreeKind: 3,
    Straight: 4,
    Flush: 5,
    FullHouse: 6,
    FourKind: 7,
    StraightFlush: 8,
    RoyalFlush: 9,
  };
  let lvl = 0;
  if (isRoyalFlush(NumArr)) {
    lvl = setsLevel.RoyalFlush;
  } else if (isStraightFlush(NumArr)) {
    lvl = setsLevel.StraightFlush;
  } else if (isFourKind(NumArr)) {
    lvl = setsLevel.FourKind;
  } else if (isFullHouse(NumArr)) {
    lvl = setsLevel.FullHouse;
  } else if (isFlush(NumArr)) {
    lvl = setsLevel.Flush;
  } else if (isStraight(NumArr)) {
    lvl = setsLevel.Straight;
  } else if (isThreeKind(NumArr)) {
    lvl = setsLevel.ThreeKind;
  } else if (isTwoPair(NumArr)) {
    lvl = setsLevel.TwoPair;
  } else if (isPair(NumArr)) {
    lvl = setsLevel.Pair;
  } else {
    lvl = setsLevel.HighCard;
  }
  // console.log(`lvl:${lvl}`)
  return lvl;
}

const setsClassify = {};
setsClassify.isPair = isPair;
setsClassify.isTwoPair = isTwoPair;
setsClassify.isThreeKind = isThreeKind;
setsClassify.isFourKind = isFourKind;
setsClassify.isFlush = isFlush;
setsClassify.isStraight = isStraight;
setsClassify.isStraightFlush = isStraightFlush;
setsClassify.isRoyalFlush = isRoyalFlush;
setsClassify.isFullHouse = isFullHouse;
setsClassify.classify = classify;
export default setsClassify;
