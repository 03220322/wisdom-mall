import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login';
import Home from '@/views/layout/home.vue';
import Category from '@/views/layout/category.vue';
import Cart from '@/views/layout/cart.vue';
import User from '@/views/layout/user.vue';

import store from '@/store';

const Layout = () => import('@/views/layout');
const myOrder = () => import('@/views/myorder');
const Pay = () => import('@/views/pay');
const Product = () => import('@/views/prodetail');
const SearchPage = () => import('@/views/search');
const SearchList = () => import('@/views/search/list.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
      ],
    },
    { path: '/myorder', component: myOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: Product },
    { path: '/search', component: SearchPage },
    { path: '/searchlist', component: SearchList },
  ],
});

// 所有的页面在被渲染前都会经过全局访问
// 全局前置导航守卫 到哪去，从哪来，是否放行
// 定义一个数组，专门存放需要访问权限的页面
const autherURl = ['/pay', '/order'];
router.beforeEach((to, from, next) => {
  // 拿到用户的token，根据token判断是否放行
  if (!autherURl.includes(to.path)) {
    // 非权限页面，直接放行
    next();
    return;
  }

  const token = store.getters.token;
  // console.log(token);

  // 权限页面，检查token
  if (token) {
    // 有token，放行
    next();
  } else {
    // 没有token，跳转到登录页
    next('/login');
  }
});

export default router;
