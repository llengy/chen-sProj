import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      alias: '/index',
      name: 'index',
      component: () =>
        import ('@/views/index')
    }, {
      path: '/login',
      name: 'login',
      component: () =>
        import ('@/views/login')
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      component: () =>
        import ('@/views/resetpwd')
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: () =>
        import ('@/views/tabs/userCenter')
    },
    {
      path: '/category',
      name: 'category',
      component: () =>
        import ('@/views/categories/index')
    }
  ]
})