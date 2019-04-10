<template>
  <div class="alipay">
    <van-nav-bar title="提现记录" left-text="返回" left-arrow @click-left="$router.push('/user')"/>
    <div style="margin-top:10px">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getLog">
        <van-cell v-for="item in cashList" :key="item.id" :label="item.status">
          <span slot="title">{{getDate(item.getDate)}}</span>
          <span>{{item.taobi|getMoney}} 元</span>
        </van-cell>
      </van-list>
      <no-data v-if="cashList.length == 0&&!loading"></no-data>
    </div>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup, NavBar, Button } from "vant";
import NoData from "@/components/NoData";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    NoData
  },
  data() {
    return {
      loading: false,
      finished: false,
      cashList: [],
      page: {
        currpage: 0,
        pagecount: 1
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    getLog() {
      let _current = this.page.currpage + 1;
      let _url = "/tixianlog/" + _current;
      if (_current > this.page.pagecount) {
        this.finished = true;
        return false;
      }
      this.axios.get(_url).then(res => {
        this.loading = false;
        let result = res.data;
        let { pagecount, currpage, data } = result.data;
        this.page = { pagecount, currpage };
        if (data.length > 0) {
          this.cashList = [...this.cashList, ...data];
        }
        if (data.length < 20) {
          this.finished = true;
        }
      });
    },
    getDate(date_str) {
      return date_str.split(".")[0];
    }
  },
  filters: {
    getMoney(money) {
      let _money = Math.ceil(money * 100) / 100;
      return _money;
    }
  }
};
</script>

<style lang="less">
.alipay {
  z-index: 1000;
  padding-bottom: 55px;
}
</style>
