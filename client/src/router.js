import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('./views/Registered')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  Nprogress.start()
  next()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router