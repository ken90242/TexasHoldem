function getCard(num) {
  let res;
  switch (Math.floor(num / 13)) {
    case 3:
      res = 'spade';
      break;
    case 2:
      res = 'heart';
      break;
    case 1:
      res = 'diamond';
      break;
    case 0:
      res = 'club';
      break;
    default:
      break;
  }
  return { suit: res, val: (num % 13) + 1 };
}

function toCard(card) {
  const numberTable = {
    11: 'J',
    1: 'A',
    12: 'Q',
    13: 'K',
  };
  const symbolTable = {
    club: '\u{2663}',
    diamond: '\u{2666}',
    heart: '\u2665',
    spade: '\u2660',
  };
  const symbol = symbolTable[card.suit];
  const number = numberTable[card.val] || card.val;
  const type = card.suit;

  return { symbol, number, type };
}

function getSuitLv(num) {
  const obj = {
    spade: 3,
    heart: 2,
    diamond: 1,
    club: 0,
  };
  const res = obj[getCard(num).suit];
  return res;
}

function getNum(obj) {
  const suit = obj.suit;
  const val = obj.val;
  let res;
  switch (suit) {
    case 'spade':
      res = 39;
      break;
    case 'heart':
      res = 26;
      break;
    case 'diamond':
      res = 13;
      break;
    case 'club':
      res = 0;
      break;
    default:
      break;
  }
  res += val - 1;

  return res;
}

function toNumArr(cards) {
  const res = cards.map((card) => {
    let weight;
    let val;
    switch (card.type) {
      case 'club':
        weight = 0;
        break;
      case 'diamond':
        weight = 1;
        break;
      case 'heart':
        weight = 2;
        break;
      case 'spade':
        weight = 3;
        break;
      default:
        break;
    }
    switch (card.number) {
      case 'J':
        val = 11;
        break;
      case 'Q':
        val = 12;
        break;
      case 'K':
        val = 13;
        break;
      case 'A':
        val = 1;
        break;
      default:
        val = card.number;
        break;
    }
    return (weight * 13) + (val - 1);
  });
  return res;
}

const setsConvert = {};
setsConvert.getCard = getCard;
setsConvert.getNum = getNum;
setsConvert.toCard = toCard;
setsConvert.toNumArr = toNumArr;
setsConvert.getSuitLv = getSuitLv;
export default setsConvert;
