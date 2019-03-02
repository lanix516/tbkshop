<template>
  <div class="wrapper">
    <div class="coupon">
      <span class="coupon-price">{{offset}} 元</span>
      <a :href="quanUrl" class="coupon-btn" target="_blank">立即领券</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["offset", "quanUrl"]
};
</script>
<style lang="less">
.wrapper {
  display: block;
  height: 150px;
  background-image: -webkit-gradient(
    linear,
    0% 0%,
    50% 100%,
    from(#ff0000),
    to(rgb(255, 255, 255))
  );
  .coupon {
    position: relative;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-size: 100% 100%;
    background-image: url("~@/assert/images/coupon-back.png");
    background-repeat: no-repeat;
    &-price {
      color: #d0021b;
      font-size: 32px;
      height: 48px;
      line-height: 48px;
      font-weight: 900;
      display: block;
      text-align: center;
      padding: 55px 125px 0 0;
    }
    &-btn {
      position: absolute;
      right: 20px;
      top: 63px;
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>

