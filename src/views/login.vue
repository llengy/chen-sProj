<template>
  <main class="login">
    <img class="logo" src="../assets/w.png" alt="">
    <div class="login-tab">
      <span @click="toggleTab(0)" :class="{'login-tab-active': tabIndex === 0}" class="login-tab-item">登录</span>
      <span  @click="toggleTab(1)" :class="{'login-tab-active': tabIndex === 1}"  class="login-tab-item">注册</span>
    </div>
    <!-- 登录 -->
    <div class="login-form" v-show="tabIndex === 0">
      <div class="form-group">
       <input type="text" class="form-control" placeholder="用户名" v-model="loginForm.userName">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="请输入密码" v-model="loginForm.passwd">
      </div>
      <div class="form-group checkbox">
        <div class="custom-checkbox">
          <input ref="chkbox" type="checkbox" class="custom-control-input" v-model="checked" id="checkbox">
          <label class="custom-control-label" for="checkbox">
            <span>记住我</span>
          </label>
        </div>
        <router-link class="help" to="/resetpwd">
          忘记密码？
        </router-link>
      </div>
      <mt-button class="cus-btn" type="default" @click="handleLogin" size="large">登录</mt-button>
    </div>
    <!-- 注册 -->
    <div class="register login-form" v-show="tabIndex === 1">
      <div class="form-group">
       <input type="tel" class="form-control" placeholder="请输入手机号" v-model="registerForm.tel">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="请输入验证码" v-model="registerForm.smscode">
        <span @click="getSMSCode" class="sms-btn">获取验证码</span>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="请输入密码" v-model="registerForm.passwd">
      </div>
      <mt-button class="cus-btn" type="default" @click="handleRegister" size="large">注册</mt-button>
    </div>
  </main>
</template>
<script>
import {post, get} from '../utils/http.js'
export default {
  data () {
    return {
      tabIndex: 0,
      isRegister: false,
      checked: false,
      loginForm: {
        userName: '13368342442',
        passwd: '123456'
      },
      registerForm: {
        tel: '',
        SMSCode: '',
        passwd: ''
      }
    }
  },
  mounted () {
    
    // document.body.style.overflow='hidden'   
    // document.addEventListener("touchmove",(e) => {
    //   e.preventDefault();
    // },false)
  },
  methods: {
    toggleTab(index) {
      this.tabIndex = index
    },
    handleLogin() {
      post('../login',{
        username: this.loginForm.userName,
        password: this.loginForm.passwd
      }).then(response => {
        // if (response.status == 200) {
        //   成功
          // var json = response.data;
          // console.log(response.data)
          if (response == true) {
            alert('登录成功');
            this.$router.replace({path: '/index'})

          } else {
            alert('账号密码错误!');
          }
        // } else {
        //   //失败
        //   alert('登录失败!');
        // }
      }, response => {
        alert('找不到服务器!');
      });
      // this.$router.push({name: 'index', params: {sel: '我的'}})
    },
    handleRegister() {

    },
    getSMSCode() {
      alert(123)
      alert(this.registerForm.tel)
    }
  }
}
</script>
<style lang="less"  type="text/less">
.login{
  height: 104%;
  overflow: hidden;
  background: url('../assets/bg.png') no-repeat center / cover;

  /deep/ .mint-header-title{
    overflow: auto;
  }
  .logo{
    width: 55.2px;
    height: 60.2px;
    margin-top: 69px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .login-tab{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 95.8px;
    text-align: center;
    margin-bottom: 63px;
    .login-tab-item{
      opacity: 0.3;
      font-size: 48px;
      color: #FFFFFF;
      letter-spacing: -2px;
      text-align: center;
      line-height: 64px;
      &:nth-child(1){
        margin-right: 45.25px;
      }
      &:nth-child(2){
        margin-left: 45.25px;
      }
    }
    .login-tab-active{
      opacity: 1;
    }
  }
  .login-form{
    width: 500px;
    margin: 0 auto;
    .form-group{
      margin-bottom: 20px;
      position: relative;
      display: flex;
      flex-direction: row;
      .form-control{
        box-sizing: border-box;
        padding: 25px 30px;
        height: 80px;
        width: 500px;
        opacity: 0.6;
        background: rgba(35,35,35,0.20);
        border: 2px solid #FFFFFF;
        border-radius: 10px;
        color: #fff;
        font-size: 24px;
        line-height: 30px;
        z-index: 1;
      }
      .custom-checkbox{
        // width: 100%;
        flex: 1;
        .custom-control-input{
          position: relative;
          opacity: 0;
        }
        .custom-control-label{
          font-size: 24px;
          color: #FFFFFF;
          line-height: 30px;
          margin-left: 20px;
        }
        .custom-control-label:before{
          content: '';
          display: inline-block;
          width: 40px;
          height: 40px;
          opacity: 0.8;
          background: rgba(35,35,35,0.20);
          border: 2px solid #FFFFFF;
          border-radius: 6px;
          position: absolute;
          left: 0px;
        }
        input[type="checkbox"] +label.custom-control-label:after{
          content: '';
          position: absolute;
          display: inline-block;
          top: 37%;
          left: 14px;
          margin-top: -5px;
          font-size: 11px;
          line-height: 1;
          width: 12px;
          height: 17px;
          transform: rotate(45deg);
          border-right: 2px solid transparent;
          border-bottom: 2px solid transparent;
          transition: border-color .3s ease;
          z-index: 10;
        }
        input[type="checkbox"]:checked +label.custom-control-label:after{
          content: '';
          border-right-color: #fff;
          border-bottom-color:#fff;
        }
      }
    }
    .checkbox{
      margin: 40px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .help{
        font-size: 24px;
        color: #FFFFFF;
        text-align: right;
        line-height: 40px;
        text-decoration: none;
      }
    }
    .cus-btn{
      background-color: #1F4BA5;
      border: 1px solid #1F4BA5;
      border-radius: 50px;
      color: #fff;
      padding: 0;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -webkit-user-select: none;
      -moz-user-focus: none;
      -moz-user-select: none;

      /deep/ label.mint-button-text{
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        line-height: 30px;
      }
    }
  }
  .register{
    transition: all .3s ease-in-out;
    .cus-btn{
      margin-top: 45px;
    }
    .sms-btn{
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      color: #FFFFFF;
      line-height: 30px;
      z-index: 30;
      -webkit-user-select: none;
      -moz-user-select: none;
    }
  }
}
</style>

