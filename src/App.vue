<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <Tab v-show="!$route.meta.fullScreen"/>
  </div>
</template>
<script>
import Tab from "./components/Tab";
export default {
  components: {
    Tab
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  font-family: Helvetica;
}
.H {
  color: #ff0000;
}
</style>