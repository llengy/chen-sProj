const state = {
  currentUser: JSON.parse(sessionStorage.getItem("user")) || {},
  isLogin: sessionStorage.getItem("isLogin") || false,
  // token:""
}
const getters = {}
const mutations = {
  //更改用户状态
  userStatus(state, user) {
    if(user){
      sessionStorage.setItem("user",JSON.stringify(user));
      sessionStorage.setItem("isLogin",true);
      state.currentUser = user;
      state.isLogin = true;
    }else if( null == user){
      //退出的时候清空session
      sessionStorage.setItem("user",null);
      // sessionStorage.setItem("userToken",null);
      sessionStorage.setItem("isLogin",false);
      state.currentUser =null;
      state.isLogin = false;
      // state.token = "";
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
