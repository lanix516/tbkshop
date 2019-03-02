<template>
  <div class="login">
    <van-row type="flex" justify="center">
      <van-col span="20">
        <div style="margin:120px 0">
          <div class="page-logo">
            <img src="../../assets/images/dd.png">
          </div>
          <van-cell-group>
            <van-field v-model="form.username" required clearable label="用户名" placeholder="请输入用户名"/>

            <van-field
              v-model="form.password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
            />
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
            <van-button type="info" size="large" @click="login">立即登陆</van-button>
          </van-cell-group>
        </div>

        <div class="other-way">
          <p class="other-title">其他方式登陆</p>
          <van-row type="flex" justify="space-between">
            <van-col span="6">
              <img src="../../assets/images/taobao.png">
            </van-col>
            <van-col span="6">
              <img src="../../assets/images/wecaht.png">
            </van-col>
            <van-col span="6">
              <img src="../../assets/images/QQ.png">
            </van-col>
          </van-row>
        </div>
        <div class="notice">
          <a href="/">免责条款</a>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Row, Col, Field, Button, CellGroup } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loader: ""
    };
  },
  created() {
    this.loader = this.$loading.show();
  },
  methods: {
    login() {
      if (!this.form.username) {
        this.$toast("请输入用户名");
        return false;
      }
      if (!this.form.password) {
        this.$toast("请输入密码");
        return false;
      }
      let form = new FormData();
      form.append("name", this.form.username);
      form.append("pwd", this.form.password);
      this.axios
        .post("/login", form, {
          withCredentials: true
        })
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.loader.hide();
            this.$toast.success("登陆成功");
            this.$router.push("/home");
          } else {
            this.$toast.fail(data.msg);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
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
