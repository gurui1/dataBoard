import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useMain } from "@/store/home";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [

  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/views/login.vue"),
  // },
  {
    path: "/main",
    name: "main",
    redirect: "/dataBoard",
    component: () => import("@/views/main.vue"),
    children: [
      {
        path: "/dataBoard",
        name: "dataBoard",
        component: () => import("@/components/dataBoard.vue"),
      },

      {
        path: "/biao1",
        name: "biao1",
        component: () => import("@/components/Board/biao1.vue"),
      },
      {
        path: "/biao2",
        name: "biao2",
        component: () => import("@/components/Board/biao2.vue"),
      },
      {
        path: "/biao3",
        name: "biao3",
        component: () => import("@/components/Board/biao3.vue"),
      },
      {
        path: "/biao4",
        name: "biao4",
        component: () => import("@/components/Board/biao4.vue"),
      },
      {
        path: "/biao5",
        name: "biao5",
        component: () => import("@/components/Board/biao5.vue"),
      },
      {
        path: "/biao6",
        name: "biao6",
        component: () => import("@/components/Board/biao6.vue"),
      },
      {
        path: "/biao7",
        name: "biao7",
        component: () => import("@/components/Board/biao7.vue"),
      },
    ]
  },
 
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});


//路由拦截
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (to.path == "/") {
    next({ path: "/main" });
  }
  next()
  // if (token) {
  //   if (to.path == "/login") {
  //     next({ path: "/"+ useMain().cebianName.split("|")[0] });
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (to.path != "/login") {
  //     next({ path: "/login" });
  //   } else {
  //     next();
  //   }
  // }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router