import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      name: "home",
      path: "/",
      component: () => import("./views/index"),
      meta: {
        title: "首页",
        keepAlive: true,
      }
    },
    {
      name: "user",
      path: "/user",
      component: () => import("./views/user"),
      meta: {
        title: "会员中心"
      }
    },
    {
      name: "alipay",
      path: "/alipay",
      component: () => import("./views/user/alipay"),
      meta: {
        title: "支付宝账号",
        fullScreen: true
      }
    },
    {
      name: "cash",
      path: "/cash",
      component: () => import("./views/user/cash"),
      meta: {
        title: "申请提现",
        fullScreen: true
      }
    },
    {
      name: "cashlog",
      path: "/cashlog",
      component: () => import("./views/user/cashLog"),
      meta: {
        title: "提现记录",
        fullScreen: true
      }
    },
    {
      name: "orderList",
      path: "/orderlist",
      component: () => import("./views/user/orderList"),
      meta: {
        title: "所有订单",
        fullScreen: true
      }
    },
    {
      name: "tuiLog",
      path: "/tuilog",
      component: () => import("./views/user/tuiLog"),
      meta: {
        title: "推广记录",
        fullScreen: true
      }
    },
    {
      name: "cart",
      path: "/cart",
      component: () => import("./views/cart"),
      meta: {
        title: "购物车"
      }
    },
    {
      name: "search",
      path: "/search",
      component: () => import("./views/search/Search"),
      meta: {
        title: "搜索",
        keepAlive: true
      }
    },
    {
      name: "goods",
      path: "/goods",
      component: () => import("./views/goods"),
      props: route => ({ keyword: route.query.keyword }),
      meta: {
        title: "商品详情",
        fullScreen: true
      }
    },
    {
      name: "profit",
      path: "/profit",
      component: () => import("./views/profit"),
      meta:{
        title: "我要赚钱",
        keepAlive: true
      }
    },
    {
      name: "register",
      path: "/register",
      component: () => import("./views/user/register.vue"),
      meta: {
        title: "用户注册",
        fullScreen: true
      }
    },
    {
      name: "registeruser",
      path: "/register/:uid",
      component: () => import("./views/user/register.vue"),
      meta: {
        title: "用户注册",
        fullScreen: true
      }
    },
    {
      name: "login",
      path: "/login",
      component: () => import("./views/user/login.vue"),
      meta: {
        title: "登陆",
        fullScreen: true
      }
    }
  ]
});
