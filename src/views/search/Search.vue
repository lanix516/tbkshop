<template>
  <div class="search">
    <div class="content">
      <div class="logo">
        <img :src="require('../../assets/images/dd64.png')">
      </div>
      <van-cell-group>
        <van-field
          v-focus
          ref="searchArea"
          v-model="goodMessage"
          type="textarea"
          placeholder="请将淘口令或链接粘贴到此处"
          rows="3"
          autosize
          border
        />
      </van-cell-group>
      <van-button @click="doSearch" class="search-btn" size="large" type="warning">查看优惠</van-button>
    </div>
    <div class="info-area">
      <van-row justify="center">
        <van-col span="6" style="text-align:center">
          <van-icon name="fire" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="shop-collect" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="goods-collect" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="lock" size="32px"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Button, Field, Cell, CellGroup, Icon, Row, Col } from "vant";

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },

  data() {
    return {
      goodMessage: ""
    };
  },
  mounted() {
    this.$refs["searchArea"].focus();
    this.$nextTick().then(() => {
    })
  },
  computed: {},

  methods: {
    doSearch() {
      if (this.goodMessage) {
        this.$router.push(`/goods?keyword=${this.goodMessage}`);
      } else {
        this.$toast("请将淘口令或链接粘贴到文本框中");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .content {
    margin-top: 100px;
    padding: 10px;
    .logo {
      text-align: center;
      margin-bottom: 10px;
    }
    .search-btn {
      margin-top: 20px;
    }
    .center {
      text-align: center;
    }
  }
  .info-area {
    margin-top: 20px;
  }
}
</style>
