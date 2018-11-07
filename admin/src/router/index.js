import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 访问首页的时候 直接跳转到 /list
      redirect: '/list'
    },
    {
      // 引入登录组件
      path: '/login',
      component: () => import('@/components/Login')
    },
    {
      path: '/list',
      component: () => import('@/components/List')
    },
    {
      path: '*',
      component: () => import('@/components/Login')
    }
  ]
})
