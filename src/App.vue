<template>
  <div id="app">
    <keep-alive include="Home,Cart,User">
      <router-view/>
    </keep-alive>
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
}
.H {
  color: #ff0000;
}
</style>