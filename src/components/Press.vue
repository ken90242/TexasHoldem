<template>
  <div class="outside">
    <div class="circle">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ['text', 'class'],
};
</script>

<style scoped>
.outside {
  cursor: pointer;
  text-align: center;
  display: inline-block;
  vertical-align: bottom;
}
.circle {
  font-size: 20px;
  border: 2px solid #a1a1a1;
  padding: 10px 10px; 
  background: #dddddd;
  width: 140px;
  height: 30px;
  line-height: 30px;
  border-radius: 40px;
  margin: 10px;
}
.inactive {
  color: gray;
  cursor: not-allowed;
}
</style>
