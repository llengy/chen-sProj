<template>
  <main class="login">
    <img class="logo" src="../assets/w.png" alt="">
    <div class="login-tab">
      <span  @click="toggleTab(0)" :class="{'login-tab-active': tabIndex === 0}" class="login-tab-item">登录</span>
      <span  @click="toggleTab(1)" :class="{'login-tab-active': tabIndex === 1}"  class="login-tab-item">注册</span>
    </div>
    <!-- 登录 -->
    <div class="login-form" v-show="tabIndex === 0">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="手机号" v-model="loginForm.tel">
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
        <input type="text" class="form-control" placeholder="请输入名称" v-model="registerForm.userName">
      </div>
      <div class="form-group">
        <input class="sex-btn" type="radio" checked ="checked" name="sex" value="男" v-model="registerForm.sex"><label class="sex">男</label>
        <input class="sex-btn" type="radio"  name="sex" value="女" v-model="registerForm.sex"><label class="sex" >女</label>
      </div>
      <div class="form-group">
        <input type="tel" class="form-control" placeholder="请输入手机号" v-model="registerForm.tel">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="请输入验证码" v-model="registerForm.smscode">
        <span v-show="show" @click="getSMSCode" class="sms-btn">获取验证码</span>
        <span v-show="!show" class="sms-btn">{{btntxt}}</span>
        <!--<span @click="getSMSCode" class="sms-btn">{{btntxt}}</span>-->
        <!--<button :disabled="disabled" @click="getSMSCode" class="sms-btn">{{btntxt}}</button>-->
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="请输入密码" v-model="registerForm.passwd">
      </div>
      <mt-button class="cus-btn" type="default" @click="handleRegister" size="large">注册</mt-button>
    </div>
  </main>
</template>
<script>
  export default {
    inject: ['reload'],
    data () {
      return {
        tabIndex: 0,
        time:0,
        btntxt:"获取验证码",
        // disabled: false,
        show: true,
        isRegister: false,
        checked: false,
        loginForm: {
          tel: '15289918051',
          passwd: '123456'
        },
        registerForm: {
          userName: '',
          sex: '',
          tel: '15289918051',
          smscode: '',
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
        this.$http.post('/api/login',{
          mobile: this.loginForm.tel,
          password: this.loginForm.passwd
        }).then(response => {
          if (response.data == true) {
            alert('登录成功');
            // this.$router.replace({path: '/index'})
            this.$router.push({name: 'index',params: {customer : response.data }})
          } else {
            alert('账号密码错误!');
          }
        }, response => {
          alert('找不到服务器!');
        });
        // this.$router.push({name: 'index', params: {sel: '我的'}})
      },

      getSMSCode() {
        if (this.registerForm.tel === '') {
          alert("请输入手机号码")
        } else {
          if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.registerForm.tel)) {
            alert("手机格式不正确");
          } else {
            //生成随机数
            this.smscodeT = "";
            this.length = 5;
            this.randomNumStr = "";
            for(this.i = 0; this.i < this.length;this.i++){
              this.randomNum = Math.floor(Math.random() * 10);
              this.randomNumStr += this.randomNum;
            }
            this.smscodeT = this.randomNumStr
            this.$http.post('/api/sendSMS',{
              codeT: this.smscodeT,
              mobile: this.registerForm.tel
            }).then(response => {
              if(response.data == true){
                this.time=60;
                this.show = false;
                this.timer();
              }else {
                alert("发送验证失败")
              }
            })

          }
        }
      },

      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntxt=this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntxt="获取验证码";
          this.show = true;
        }
      },

      handleRegister() {
        if(this.registerForm.userName === ''){
          alert("姓名要输入哦");
        }else {
          if(this.registerForm.sex === ''){
            alert("要选性别哦");
          }else {
            if (this.registerForm.tel === '') {
              alert("要输入手机号码哦")
            } else {
              if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.registerForm.tel)) {
                alert("手机格式不正确");
              } else {
                if (this.registerForm.smscode === ''){
                  alert("验证码要输入哦");
                } else {
                  if (this.registerForm.passwd === ''){
                    alert("密码要输入哦");
                  } else {
                    if(this.time > 0){
                      this.$http.post("/api/register",{
                        code: this.registerForm.smscode,
                        usefulTime: this.time,
                        codeT: this.smscodeT,
                        cname:this.registerForm.userName,
                        sex:this.registerForm.sex,
                        mobile:this.registerForm.tel,
                        password:this.registerForm.passwd
                      }).then(response => {
                        if(response.data !=0 ){
                          alert("注册成功")
                          this.reload()
                        }else {
                          alert("注册失败")
                        }
                      })
                    }else {
                      alert("验证超时")
                    }

                  }
                }
              }
            }
          }
        }
      },

      // query(){
      //   var formMess=this.formMess
      //   Axios.post(api+"/order/select/reception", formMess)
      //     .then(function (res) {
      //       if(res.data.code==200){
      //         console.log(res.data.data);
      //         this.productResult=res.data.data;
      //         this.productResult.length=3;
      //       }else if(res.data.code==400){
      //         alert(res.data.message)
      //       }
      //
      //     }.bind(this))
      // }
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
      /*button_span{border:0;background-color:Transparent;}*/
      button{
        border: 1px;
      }
      label.sex{
        opacity: 0.9;
        font-size: 35px;
        color: #FFFFFF;
        letter-spacing: 50px;
        margin-left: 15px;
        text-align: center;
        line-height: 30px;
      }
      .sex-btn{
        display: flex;
        margin-left: 45px;
        opacity: 0.9;
        width: 30px;
        height: 30px;
        font-size: 48px;
        color: #FFFFFF;
        text-align: center;
        line-height: 64px;
      }
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

