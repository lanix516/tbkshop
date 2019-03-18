import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      name: "home",
      path: "/home",
      component: () => import("./views/index"),
      meta: {
        title: "首页"
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
      name: "cart",
      path: "/cart",
      component: () => import("./views/cart"),
      meta: {
        title: "购物车"
      }
    },
    {
      name: "search",
      path: "/",
      component: () => import("./views/search/Search"),
      meta: {
        title: "搜索"
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
      name: "register",
      path: "/register",
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
