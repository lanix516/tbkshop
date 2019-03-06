<template>
  <div>
    <van-tabbar v-model="active" class="tab" style="z-index:999">
      <!-- <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item> -->
      <van-tabbar-item icon="search" to="/">搜索</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
</style>