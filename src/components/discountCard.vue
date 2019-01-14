<template>
  <div>
    <navbar title="我的折扣卡" type="detail"></navbar>
    <div class="list">
      <img src="../assets/img/card1.png" alt="" />
      <p>暂无影院会员卡</p>
      <div class="link-btn">
        <a href="javascript:;">+查看本城市全部会员卡</a>
      </div>
    </div>
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
.list {
  text-align: center;
  padding-top: 128px;
}
.list img {
  width: 93px;
}
.list p {
  color: #999;
}
.link-btn a {
  padding: 13px;
  display: block;
  width: 159px;
  height: 15px;
  line-height: 15px;
  border: 1px solid #f34d41;
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 29px;
  color: #f34d41;
  background-color: #ffffff;
}
img{
	display: inline;
}
</style>

