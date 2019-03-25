
<template>
  <div style="padding:5px 10px">
    <p style="font-size:12px;color:#666">
      <van-icon name="info-o"/>
      {{notice}}
    </p>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: ["notice"],
  components: { [Icon.name]: Icon }
};
</script>
