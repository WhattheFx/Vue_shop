import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import GoodsList from '../components/goods/List.vue'
import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // 设置重定向
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    // 当访问home组件时候，自定义到welcome组件，接下来放路由占位符
    redirect:'/welcome',
    children: [
      {path: '/welcome',component: Welcome},
      {path: '/users',component: Users},
      {path: '/rights',component: Rights},
      {path: '/roles',component: Roles},
      {path: '/categories',component: Cate},
      { path: '/goods', component: GoodsList },
      { path: '/params', component: Params }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  //to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next 是一个函数，表示放行
  // next() 放行  next(./login)强制跳转
  // 如果用户访问的是登录页面，直接放行
  if(to.path === '/login') return next()
  //如果访问的不是登录页面，而是有权限的页面，要先拿到token，根据是否有token，强制跳转。
  //获取token，因为tokne已经存到sesionstorge里面了
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果存的这个token为空，则强制跳转到登录页面
  if(!tokenStr) return next('./login')
  //如果token值不为空，则直接放行。
  next()
})

export default router
