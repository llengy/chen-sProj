const state = {
  mycart:JSON.parse(sessionStorage.getItem("mycart")) ||[]
}
const getters = {}
const mutations = {
  UPDATE_CART(state, val) {
    sessionStorage.setItem("mycart",JSON.stringify(val));
    state.mycart = val
  },
  CLEAR_CART(state) {
    sessionStorage.setItem("mycart",null);
    state.mycart = null
  },

}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions
}
