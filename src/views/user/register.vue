<template>
  <div class="register">
    <van-nav-bar title="多多返利网" left-text="返回" @click-left="$router.push('/')" left-arrow/>

    <van-row type="flex" justify="center">
      <van-col span="24">
        <div style="margin:80px 0">
          <div class="page-logo">
            <img src="../../assets/images/dd.png">
          </div>
          <van-cell-group>
            <van-cell>
              <van-field
                v-model="form.username"
                required
                label="手机号"
                placeholder="请输入手机号"
                left-icon="phone-o"
                right-icon="close"
                @click-right-icon="clearName"
              />
            </van-cell>
            <van-cell>
              <van-field
                v-model="form.password"
                :type="passwordType"
                label="密码"
                placeholder="请输入密码"
                left-icon="bag-o"
                right-icon="eye-o"
                @click-right-icon="showPassword"
                required
              />
            </van-cell>

            <!-- <van-field
              v-model="form.phone"
              label="手机号"
              placeholder="请输入手机号"
              error-message="手机号格式错误"
            />
            <van-field v-model="form.sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>-->
          </van-cell-group>
          <van-cell-group style="padding:10px">
            <van-button type="primary" size="large" @click="register">立即注册</van-button>
          </van-cell-group>
        </div>

        <div class="other-way">
          <p class="other-title">其他方式登陆</p>
          <van-row type="flex" justify="space-between">
            <van-col span="6">
              <img @click="showMessage()" src="../../assets/images/taobao.png">
            </van-col>
            <van-col span="6">
              <img @click="showMessage()" src="../../assets/images/wecaht.png">
            </van-col>
            <van-col span="6">
              <img @click="showMessage()" src="../../assets/images/QQ.png">
            </van-col>
          </van-row>
        </div>
        <div class="notice">
          <a href="/">注册须知</a>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Row, Col, Field, Button, CellGroup, NavBar, Cell } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      uid: 1,
      form: {
        username: "",
        password: "",
        sms: ""
      },
      passwordType: "password"
    };
  },
  mounted() {
    if (this.$route.params.uid) {
      this.uid = this.$route.params.uid;
    }
  },
  methods: {
    showMessage() {
      this.$toast("该功能后续开放");
    },
    showPassword() {
      this.passwordType = this.passwordType == "password" ? "" : "password";
    },
    clearName() {
      this.form.username = "";
    },
    register() {
      if (!this.form.username) {
        this.$toast("请输入手机号码");
        return false;
      }
      let pattern = /^1[34578]\d{9}$/;
      if (!pattern.test(this.form.username)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!this.form.password) {
        this.$toast("请输入密码");
        return false;
      }
      this.loader = this.$loading.show();
      let form = new FormData();
      form.append("phone", this.form.username);
      form.append("pwd", this.form.password);
      this.axios.post(`/reg/${this.uid}/`, form).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$store.commit("setLogin", true);
          this.$store.commit("setUserInfo", data.data);
          this.loader.hide();
          this.$toast.success("注册成功");
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          this.$router.push("/");
        } else {
          console.log(data);
          this.loader.hide();
          this.$toast.fail(data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  .page-logo {
    text-align: center;
    margin: 10px 0;
  }
  .notice {
    font-size: 12px;
    color: blue;
    text-align: center;
    margin-top: 30px;
    a {
    }
  }

  .other-way {
    text-align: center;
    .other-title {
      font-size: 12px;
      text-align: center;
      color: lightgray;
    }
  }
}
</style>
