function getCard(num) {
  let res;
  switch (Math.floor(num / 13)) {
    case 3: res = 'spade'; break;
    case 2: res = 'heart'; break;
    case 1: res = 'diamond'; break;
    case 0: res = 'club'; break;
    default: break;
  }
  return { suit: res, val: (num % 13) + 1 };
}

function getNum(obj) {
  const suit = obj.suit;
  const val = obj.val;
  let res;
  switch (suit) {
    case 'spade': res = 39; break;
    case 'heart': res = 26; break;
    case 'diamond': res = 13; break;
    case 'club': res = 0; break;
    default: break;
  }
  res += val - 1;

  return res;
}

const setsConvert = {};
setsConvert.getCard = getCard;
setsConvert.getNum = getNum;
export default setsConvert;
