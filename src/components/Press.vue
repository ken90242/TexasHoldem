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
}
.circle {
  font-size: 60px;
  border: 2px solid #a1a1a1;
  padding: 10px 10px; 
  background: #dddddd;
  width: 80px;
  height: 80px;
  border-radius: 80px;
}
.inactive {
  color: gray;
  cursor: not-allowed;
}
</style>
