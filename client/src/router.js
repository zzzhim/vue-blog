import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
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
    },
    {
      path: '/articles/:id',
      name: 'articles',
      component: () => import('./views/Articles'),
      props: true
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('./views/Archive')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/Tags')
    },
    {
      path: '/readList',
      name: 'readList',
      component: () => import('./views/ReadList')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  Nprogress.start()
  
  if(getToken()) {
    if(to.path == '/login') {
      // 路由重定向
      next({ path: '/home' })
      Nprogress.done()
    }else {
      next()
    }
  }else {
    next()
  }
})

router.afterEach(() => {
  Nprogress.done()
})


export default router