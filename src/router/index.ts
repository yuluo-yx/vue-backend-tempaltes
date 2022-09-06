import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw, RouterOptions} from "vue-router";

// 引入图标
import {
  Platform,
  Document,
  Avatar,
  Management,
  HomeFilled
} from '@element-plus/icons-vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Index.vue')
  },
  {
    path: '/home',
    name: 'home',
    // 用户进入到系统首页之后是index页面，通过重定向的方式，显示为第一个子页面，避免空白显示
    redirect: "/index",
    component: () => import('../views/home/Index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/home/Index/Index.vue'),
        meta: {
          title: "首页",
          icon: HomeFilled,
          isShow: true
        }
      },
      {
        path: '/userist',
        name: 'userlist',
        component: () => import('../views/home/user/List.vue'),
        meta: {
          title: "用户管理",
          icon: Avatar,
          isShow: true
        }
      },
      {
        path: '/discussionlist',
        name: 'discussionlist',
        component: () => import('../views/home/discussion/List.vue'),
        meta: {
          title: "讨论管理",
          icon: Management,
          isShow: true
        }
      },
      {
        path: '/sysescharts',
        name: 'sysescharts',
        component: () => import('../views/home/sys/EchartsViews.vue'),
        meta: {
          title: "服务器",
          icon: Platform,
          isShow: true
        }
      },
      {
        path: '/sysuser',
        name: 'sysuser',
        component: () => import('../views/sys/SysUser.vue'),
        meta: {
          title: "",
          icon: "",
          isShow: false
        }
      },
      {
        path: '/judgeservelist',
        name: 'udgeservelist',
        component: () => import('../views/home/judge-serve/List.vue'),
        meta: {
          title: "判题机",
          icon: Document,
          isShow: true
        }
      },
      
    ]
  },
  

  // 设置重定向
  // 暂时将首页设置成home，方便开发
  {
    path: "/",
    redirect: "/home"
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,

  // 禁止浏览器回退
  scrollBehavior: () => {
    history.pushState(null, "", document.URL)
   }
});

export default router;
