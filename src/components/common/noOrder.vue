<template>
  <div class="wrapper">
    <div class="tip-text">您最近还没有新订单，赶快去下一单吧</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.wrapper {
  background: url("../../assets/img/nothing.png") no-repeat top;
  background-size: 110px 110px;
  height: 200px;
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: -100px;
  text-align: center;
  display: block;
}
.wrapper .tip-text {
  display: block;
  padding-top: 120px;
  font-size: 16px;
  height: 28px;
  line-height: 28px;
  color: #999;
}
</style>

