<template>
  <div class="alipay">
    <van-nav-bar title="支付宝账户" left-text="返回" left-arrow @click-left="$router.back()"/>
    <div style="margin-top:10px">
      <van-cell-group title="账户信息">
        <van-cell>
          <van-field v-model="info.name" required clearable label="姓名" left-icon="contact"/>
        </van-cell>
        <van-cell>
          <van-field v-model="info.zhifubao" required clearable label="支付宝帐号" left-icon="alipay"/>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell :center="true">
          <van-button @click="postAlipay" size="large" type="info">确认提交</van-button>
        </van-cell>
      </van-cell-group>
      <notice notice="此账号仅作为返利网支付返利使用，请仔细填写，以免无法收到返利"></notice>
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
      info: {
        name: "",
        zhifubao: ""
      }
    };
  },
  mounted() {
    this.checkAliCount();
  },
  computed: {},
  methods: {
    checkAliCount() {
      let url = `interface/tixian`;
      this.axios.get(url).then(res => {
        let result = res.data;
        this.info = result.data;
      });
    },
    postAlipay() {
      if (!this.info.name) {
        this.$toast("请输入该支付宝账号注册者的姓名");
        return false;
      }
      if (!this.info.zhifubao) {
        this.$toast("请输支付宝账号");
        return false;
      }
      let url = "/alter";
      let form = new FormData();
      form.append("name", this.info.name);
      form.append("zhifubao", this.info.zhifubao);
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
.alipay {
  padding-bottom: 55px;
}
</style>
