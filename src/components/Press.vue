<template>
  <div class="circle">{{ text }}</div>
</template>

<script>
export default {
  props: ['text', 'custom'],
};
</script>

<style lang="scss" scoped>
.circle {
  cursor: pointer;
  text-align: center;
  vertical-align: bottom;
  background: white;
  margin:20px;
  font-size: 20px;
  border: 2px solid #a1a1a1;
  padding: 10px 10px; 
  width: 140px;
  height: 30px;
  line-height: 30px;
  border-radius: 40px;
  &:hover {
    background: #dddddd;
  }
}
.inactive {
  color: gray;
  cursor: not-allowed;
  &:hover {
    background: white;
  }
}
</style>
