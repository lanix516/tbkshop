<template>
    <div class="profit">
        <van-nav-bar title="我要赚钱" left-text="返回" @click-left="$router.push('/')" left-arrow>
        </van-nav-bar>
    <div class="content">
        <div class="work-list"> 
         <div class="work-cell">
           这里是一个赚钱的任务
         </div>
        </div>
    </div>
    </div>
</template>
<script>
import {
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  NavBar,
} from "vant";

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
  },
}
</script>
<style scoped>
  .work-cell {
    height: 100px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius:5px;
    margin: 5px;
    background-color: #FFFFFF;
  }
</style>
