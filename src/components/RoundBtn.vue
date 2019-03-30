<template>
  <div class="round-btn">
    <van-icon size="24px" color="#FFFFFF" :name="icon" style="top:6px; left:6px"></van-icon>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  components: { [Icon.name]: Icon },
  props: ["icon"]
};
</script>
<style>
.round-btn {
  background-color: rgba(0, 0, 0, 0.4);
  height: 36px;
  width: 36px;
  position: absolute;
  top: 10px;
  border-radius: 50%;
  z-index: 10;
}
</style>

