import Vue from 'vue'
import Vuex from 'vuex'
import shopCart from './modules/shopCart'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    shopCart
  },
  strict: debug,
})