<template>
  <div class="cash">
    <van-nav-bar title="返利提现" left-text="返回" left-arrow @click-left="$router.back()"/>
    <div style="margin-top:10px">
      <van-cell-group title="提现">
        <van-cell>
          <van-field
            type="number"
            v-model="taobi"
            required
            clearable
            label="提现金额(元)"
            left-icon="alipay"
          />
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell :center="true">
          <van-button @click="postCash" size="large" type="info">确认提交</van-button>
        </van-cell>
      </van-cell-group>
      <notice notice="请务必确认提现支付宝账号正确，提现金额必须大于100"></notice>
    </div>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup, Field, NavBar, Button } from "vant";
import Clipboard from "clipboard";
import Notice from "@/components/Notice";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    Notice
  },
  data() {
    return {
      taobi: 0,
      aliCount: false
    };
  },
  mounted() {
    this.checkAliCount();
  },
  computed: {},
  methods: {
    checkAliCount() {
      let url = `/tixian`;
      this.axios.get(url).then(res => {
        let result = res.data;
        this.aliCount = result.data.zhifubao ? true : false;
      });
    },
    postCash() {
      if (!this.aliCount) {
        this.$toast("请先完善个人资料，填写提现");
        return false;
      }
      if (!this.taobi) {
        this.$toast("请输入提现金额");
        return false;
      }
      let _number = Number(this.taobi);
      if (!_number) {
        this.$toast("请输入正确的提现金额");
        return false;
      }
      if (_number < 100 || _number > 10000) {
        this.$toast("请输入正确的提现金额, ");
        return false;
      }
      return false;
      let url = "/tixian";
      let form = new FormData();
      form.append("taobi", this.taobi);
      this.axios.post(url, form).then(res => {
        let result = res.data;
        if (result.code == 200) {
          this.$toast("提交成功");
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style lang="less">
.cash {
  padding-bottom: 55px;
}
</style>
