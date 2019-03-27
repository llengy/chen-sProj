<template>
  <main>
    <Header :headers="header"></Header>
    <div class="form-box">
      <div class="form-group">
        <input type="tel" class="control-form" placeholder="输入手机号" v-model="resetFrom.tel">
      </div>
      <div class="form-group">
        <input type="text" class="control-form" placeholder="请输入验证码" v-model="resetFrom.smscode">
        <span v-show="show" @click="getResetSMSCode" class="sms-btn">获取验证码</span>
        <span v-show="!show" class="sms-btn">{{btntxt}}</span>
      </div>
      <div class="form-group">
        <input type="password" class="control-form" placeholder="新密码" v-model="resetFrom.passwd">
      </div>
      <div class="form-group">
        <input type="password" class="control-form" placeholder="确认密码" v-model="resetFrom.confirmPwd">
      </div>
      <mt-button class="cus-btn" size="large" type="default" @click="handleSubmit">确认</mt-button>
    </div>
  </main>
</template>
<script>
  import Header from '@/components/header'
  export default {
    components: {
      Header
    },
    inject: ['reload'],
    data() {
      return {
        btntxt:"获取验证码",
        show: true,
        header: {
          title: '找回密码',
          path: 'login',
          sel: ''
        },
        resetFrom: {
          tel: '',
          smscode: '',
          passwd: '',
          confirmPwd: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        //确认信息
        if (this.resetFrom.tel === '') {
          this.$toast("请输入手机号码")
          return
        }
        if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.resetFrom.tel)) {
          this.$toast("手机格式不正确");
          return
        }
        if (this.resetFrom.smscode === ''){
          this.$toast("请输入验证码");
          return
        }
        if (this.resetFrom.passwd === ''){
          this.$toast("请输入新密码");
          return
        }
        if (this.resetFrom.confirmPwd === ''){
          this.$toast("请确认密码");
          return
        }
        if (this.resetFrom.passwd !== this.resetFrom.confirmPwd){
          this.$toast("密码不一致");
          return
        }
        //修改密码
        if(this.time > 0){
          this.$http.post(this.$Api.updateCustomer,{
            code: this.resetFrom.smscode,
            usefulTime: this.time,
            codeT: this.smscodeT,
            mobile:this.resetFrom.tel,
            password:this.resetFrom.passwd
          }).then(response => {
            if (this.$global.successCode == response.data.code) {
              this.$toast("修改成功")
              this.reload()
            } else {
              this.$toast(response.data.desc);
            }
          }, response => {
            this.$toast('找不到服务器!');
          });
        }else {
          this.$toast('验证超时!');
        }
      },
      getResetSMSCode() {
        if (this.resetFrom.tel === '') {
          this.$toast("请输入手机号码")
          return
        }
        if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.resetFrom.tel)) {
          this.$toast("手机格式不正确");
          return
        }
        //生成随机数
        this.smscodeT = "";
        this.length = 5;
        this.randomNumStr = "";
        for(this.i = 0; this.i < this.length;this.i++){
          this.randomNum = Math.floor(Math.random() * 10);
          this.randomNumStr += this.randomNum;
        }
        this.smscodeT = this.randomNumStr
        this.$http.post(this.$Api.sendSms,{
          codeT: this.smscodeT,
          mobile: this.resetFrom.tel
        }).then(response => {
          if(response.data == true){
            this.time=60;
            this.show = false;
            this.timer();
          }else {
            this.$toast("发送验证失败")
          }
        })
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
      }
    }
  }
</script>
<style lang="less" scoped>
  main{
  .form-box{
    width: 500px;
    margin: 0 auto;
    margin-top: 80px;
    padding: 50px 30px 0 30px;
    height: 100%;
  .form-group{
    margin-bottom: 20px;
    position: relative;
    display: flex;
    flex-direction: row;
  label{
    display: inline-block;
    width: 120px;
    font-size: 24px;
    color: rgba(255, 255, 255, .8);
  }
  .control-form{
    box-sizing: border-box;
    padding: 25px 30px;
    height: 70px;
    width: 500px;
  // opacity: 0.6;
    background: rgba(35,35,35,0.6);
    border: 2px solid #BDC3C7;
    border-radius: 10px;
    color: #fff;
    font-size: 24px;
    line-height: 30px;
    z-index: 1;
  }
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
  .cus-btn{
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
    background-color: #3FB798;
    border: 1px solid #3FB798;
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
  }
</style>


