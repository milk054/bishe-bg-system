import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "数据统计", icon: "el-icon-s-data", auth: true },
      },
    ],
  },

  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/goods-list",
    meta: { title: "服装管理", icon: "el-icon-s-custom", auth: true },
    children: [
      {
        path: "goods-list",
        name: "GoodsList",
        component: () => import("@/views/goods/goods-list"),
        meta: { title: "服装列表", icon: "nested", auth: true },
      },
      {
        path: "goods-add",
        name: "GoodsAdd",
        component: () => import("@/views/goods/goods-add"),
        meta: { title: "添加服装", icon: "el-icon-circle-plus", auth: true },
      },
      {
        path: "goods-color",
        name: "GoodsColor",
        component: () => import("@/views/goods/goods-colors"),
        meta: { title: "颜色管理", icon: "dashboard", auth: true },
      },
      {
        path: "goods-size",
        name: "GoodsSize",
        component: () => import("@/views/goods/goods-size"),
        meta: { title: "尺码管理", icon: "el-icon-star-on", auth: true },
      },
      {
        path: "goods-edit/:id",
        name: "GoodsEdit",
        hidden: true,
        component: () => import("@/views/goods/goods-edit"),
        meta: { title: "编辑服装", icon: "el-icon-star-on", auth: true },
      },
    ],
  },

  {
    path: "/current-orders",
    component: Layout,
    redirect: "/current-orders/current-orders-list",
    meta: { title: "订单管理", icon: "el-icon-tickets", auth: true },
    children: [
      {
        path: "current-orders-list",
        name: "SalesRecord",
        component: () => import("@/views/current-orders/current-orders-list"),
        meta: { title: "订单列表", icon: "nested", auth: true },
      },
      // {
      //   path: "current-orders-add",
      //   name: "SalesRecordAdd",
      //   component: () => import("@/views/current-orders/current-orders-add"),
      //   meta: { title: "模拟下单", icon: "el-icon-circle-plus", auth: true },
      // },
    ],
  },

  {
    path: "/customer",
    component: Layout,
    redirect: "/customer",
    children: [
      {
        path: "goods-list",
        name: "CustomerList",
        component: () => import("@/views/customer"),
        meta: { title: "顾客列表", icon: "nested", auth: true },
      },
    ],
  },

  {
    path: "/comment",
    component: Layout,
    redirect: "/comment",
    children: [
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/comment"),
        meta: {
          title: "评论管理",
          icon: "el-icon-chat-line-square",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/store-info",
    component: Layout,
    redirect: "/store-info",
    children: [
      {
        path: "store-info",
        name: "StoreInfo",
        component: () => import("@/views/store-info"),
        meta: { title: "店铺信息", icon: "el-icon-s-shop", auth: true },
      },
    ],
  },

  {
    path: "/personal-center",
    component: Layout,
    redirect: "/personal-center",
    children: [
      {
        path: "personal-center",
        name: "PersonalCenter",
        component: () => import("@/views/personal-center"),
        meta: { auth: true },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
