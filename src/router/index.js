import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "../views/layout/layout";
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const routes = [
  {
    redirect: '/login',
    path: '/',
    hidden: true
  },
  {
    path: "/login",
    component: () => import("../views/login/login"),
    hidden: true,
    meta:{
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '智慧运营'
    },
    children: [
      {
        path: '/intelOperation',
        component: () => import("../views/smartOperation/smartOperation"),
        meta:{
          title: '智慧运营'
        },
        hidden: false,
        children: [
          {
            name: 'strategyArrangement',
            path: "/strategyArrangement",
            component: () => import("../views/smartOperation/strategyArrangement/strategyArrangement"),
            hidden: false,
            meta:{
              title: '策略编排'
            }
          },
          // {
          //   path: "/strategyArrangement",
          //   component: () => import("../views/smartOperation/strategyArrangement/strategyArrangement"),
          //   hidden: false,
          //   meta:{
          //     title: '策略编排'
          //   }
          // },
        ]
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  document.title = to.meta.title;
  if (to.path === '/login' || token) {
    next();
  } else {
    next('/login');
  }
})



export default router;
