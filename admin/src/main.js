// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//将状态管理的文件引入进来
import store from '@/store'
// 将图标库的JS文件引入进来
import '@/assets/image/icon/iconfont.js'
// 将全局的样式引入进来
import '@/assets/style/index'

// 引入表单验证插件
import veeValidate from 'vee-validate'

// 我们在这里，引入一个消息提示的插件，用来对用户的真实合法性进行验证
import Notification from 'vue-notification'

// 按需加载element-ui组件
import { Table, TableColumn, Rate, Form, FormItem, Pagination } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入模态框
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(veeValidate)
Vue.use(Notification)
Vue.use(Table).use(TableColumn).use(Rate).use(Form).use(FormItem).use(Pagination)
Vue.use(VModal)

// 加入我们的权限判断
import '@/permission'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})