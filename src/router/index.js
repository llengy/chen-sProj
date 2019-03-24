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
    },
    {
      path: '/address',
      name: 'address',
      component: () =>
        import ('@/views/address/index')
    },
    {
      path: '/addrModify',
      name: 'addrModify',
      component: () =>
        import ('@/views/address/addAddress')
    },
    {
      path: '/order',
      name: 'order',
      component: () =>
        import ('@/views/order/index')
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () =>
        import ('@/views/order/orderDetail')
    }
  ]
})
