<template>
  <div class="float">
    <a :href="activeUrl">
      <img src="../assets/images/xiaohongbao.gif" />
    </a>
  </div>
</template>
<script>
export default {
  props: {
    activeUrl: ""
  }
};
</script>
<style scoped>
.float {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
.float img {
  width: 80px;
}
</style>