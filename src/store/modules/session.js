const state = {
  currentUser: null,
  isLogin:false,
  token:""
}
const getters = {}
const mutations = {
  //更改用户状态
  userStatus(state, user) {
    if(user){
      state.currentUser = user;
      state.isLogin = true;
    }else if( null == user){
      //退出的时候清空session
      sessionStorage.setItem("user",null);
      sessionStorage.setItem("userToken",null);
      state.currentUser =null;
      state.isLogin = false;
      state.token = "";
    }
  }
}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions
}
