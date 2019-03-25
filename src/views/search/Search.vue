<template>
  <div class="search">
    <van-nav-bar title="多多返利网" :left-arrow="false">
      <van-icon @click="showActive=true" v-if="$store.state.isLogin" name="contact" slot="right"/>
      <span @click="gotoLogin" v-if="!$store.state.isLogin" slot="right">登陆</span>
    </van-nav-bar>
    <van-actionsheet v-model="showActive" :actions="actions" @select="onSelectAction"/>
    <div class="content">
      <div class="logo">
        <img :src="require('../../assets/images/dd64.png')">
      </div>
      <van-cell-group>
        <van-field
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
        <!-- <van-col span="6" style="text-align:center">
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
        </van-col>-->
        <van-col :span="24" v-if="!$store.state.isLogin">
          <div class="info-text">
            <van-icon name="info" size="14px" style="vertical-align: middle;margin-right: 5px;"/>请先登陆并完善账户信息，以便系统转账
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Field,
  Cell,
  CellGroup,
  Icon,
  Row,
  Col,
  NavBar,
  Actionsheet
} from "vant";

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar,
    [Actionsheet.name]: Actionsheet
  },

  data() {
    return {
      showActive: false,
      actions: [
        {
          name: "用户: ",
          subname: this.$store.state.userInfo.phone
        },
        {
          name: "退出登陆"
        }
      ],
      goodMessage: ""
    };
  },

  mounted() {
    //this.$refs["searchArea"].focus();
    this.getClipBoard();
  },
  computed: {},

  methods: {
    onSelectAction(item) {
      this.showActive = false;
      if (item.name == "退出登陆") {
        localStorage.removeItem("userInfo");
        this.$store.commit("setLogin", false);
        this.$store.commit("setUserInfo", "");
      }
    },
    getClipBoard() {
      this.$nextTick().then(() => {
        navigator.permissions
          .query({
            name: "clipboard-read"
          })
          .then(permissionStatus => {
            // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
            console.log(permissionStatus.state);
            // document.write('Pasted state: ', permissionStatus.state);

            // 监听权限状态改变事件
            permissionStatus.onchange = () => {
              console.log(permissionStatus.state);
              // document.write('Pasted state: ', permissionStatus.state);
            };
          });
        navigator.clipboard
          .readText()
          .then(text => {
            console.log("Pasted content: ", text);
            //show(text);
            this.goodMessage = text;
            if (this.goodMessage) {
              navigator.clipboard
                .writeText("")
                .then(() => {
                  console.log("清空剪贴板失败");
                })
                .catch(err => {
                  // This can happen if the user denies clipboard permissions:
                  // 如果用户没有授权，则抛出异常
                  console.error("无法复制此文本：", err);
                });
              this.doSearch();
            }
            // document.write('Pasted content: ', text);
            //   document.getElementById('taobao').innerText('aaa');
          })
          .catch(err => {
            console.error("Failed to read clipboard contents: ", err);
            document.write("Failed to read: ", err);
          });
      });
    },
    doSearch() {
      if (this.goodMessage) {
        let tmp_message = encodeURIComponent(this.goodMessage);
        this.$router.push(`/goods?keyword=${tmp_message}`);
      } else {
        this.$toast("请将淘口令或链接粘贴到文本框中");
      }
    },
    gotoLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .content {
    margin-top: 70px;
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
    .info-text {
      font-size: 14px;
      color: #999;
      padding: 15px 30px;
    }
  }
}
</style>
