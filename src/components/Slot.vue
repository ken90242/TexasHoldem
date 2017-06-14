<template>
	<div class="slot">
		<div class="small_number">{{ numberTable[card.val] || card.val }}</div>
    <div class="small_symbol">{{ symbolTable[card.suit] }}</div>
    <div class="big_symbol">{{ symbolTable[card.suit] }}</div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  data() {
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
    return { numberTable, symbolTable };
  },
};
</script>

<style scoped>
.slot {
  border-style:solid;
  border-width:3px;
	width:50px;
	height:75px;
  text-align: center;
  vertical-align: top;
  margin-right: 15px;
}
.small_number {
  margin-left: 5px;
  font-size: 20px;
  text-align: left;
}
.small_symbol {
  margin-left: 5px;
  font-size: 20px;
  text-align: left;
}
.big_symbol {
  font-size: 30px;
}
</style>
