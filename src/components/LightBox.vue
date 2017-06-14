<template>
  <div class="modal" :class="status">
    <div class="box">
      <span @click="closeBox" class="close">&times;</span>
      <iframe src="https://www.intellipoker.tw/articles?id=47"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
  methods: {
    closeBox() {
      this.$emit('hideRule');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  padding-top: 100px;
  .box {
    display:flex;
    flex-direction:column;
    justify-content:center;
    opacity: 1;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    width: 80%;
    .close {
      align-self:flex-start;
      color: #aaaaaa;
      font-size: 28px;
      font-weight: bold;
      &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
    }
    iframe {
      height: 100%;
      overflow: auto;
    }
  }
}
.modalBlock {
  display: block;
}
.modalNone {
  display: none;
}
</style>
