<template>
	<div class="slot">
		<div class="small_number">{{ card.number }}</div>
    <div class="small_symbol">{{ card.symbol }}</div>
    <div class="big_symbol">{{ card.symbol }}</div>
  </div>
</template>

<script>
export default {
  props: ['card'],
};
</script>

<style scoped>
.slot {
  border-style:solid;
  border-width:3px;
	width:50px;
	height:75px;
  text-align: center;
  display:inline-block;
  vertical-align: top;
  margin-right: 10px;
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
