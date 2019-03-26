<template>
  <main>
    <section>
      <div @click="handleLogout" v-if="isLogin" class="logout">退出</div>
      <div @click="loginOrRegister"  v-if="!isLogin" class="logout">登录/注册</div>
      <div class="top">
        <div class="avatar">
          <img v-if="!isLogin" src="../../assets/login.png" alt="">
          <img v-if="isLogin" src="../../assets/logout.png" alt="">
        </div>
        <div class="top-bg">
          <p class="nickname">{{isLogin ? username : '游客'}}</p>
          <p class="vipnum">NO.{{isLogin ? userId : '--'}}</p>
          <p class="priod">有效期至: {{isLogin ? '永久' : '--'}}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="flex tools-bar">
          <div class="tools-bar-item" v-show="isLogin">
            <p @click="expand('order')" class="tools-bar-item-title">
              <i class="icon-car"></i>
              <i class="icon-arrow"></i>
              当前订单信息
            </p>
            <div class="content order" v-show="isExpand.order && isLogin">
              <ul class="flex timeline">
                <li class="timeline-item">
                  <i class="timeline-step"></i>
                  <span class="timeline-btn">待付款</span>
                  <p class="timeline-time">状态改变时间: 2019.04.01 08:40</p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step"></i>
                  <span class="timeline-btn">待取衣</span>
                  <p class="timeline-time">状态改变时间: 2019.04.01 09:40</p>
                </li>
                <li class="timeline-item">
                  <i class="timeline-step uncheck"></i>
                  <span class="timeline-btn uncheck">已取衣</span>
                  <p class="timeline-time">状态改变时间: </p>
                </li>
                <template v-if="isVisibale">
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">已送洗</span>
                    <p class="timeline-time">状态改变时间: </p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">清洗中</span>
                    <p class="timeline-time">状态改变时间: </p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">已上挂</span>
                    <p class="timeline-time">状态改变时间: </p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">已领取</span>
                    <p class="timeline-time">状态改变时间:</p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">取回中</span>
                    <p class="timeline-time">状态改变时间:</p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">待确认</span>
                    <p class="timeline-time">状态改变时间: </p>
                  </li>
                  <li class="timeline-item">
                    <i class="timeline-step uncheck"></i>
                    <span class="timeline-btn uncheck">待评价</span>
                    <p class="timeline-time">状态改变时间: </p>
                  </li>
                </template>
              </ul>
            </div>
            <i @click="showMore" v-show="isExpand.order && isLogin" class="show-more">点击查看更多状态信息</i>
          </div>
          <div class="tools-bar-item address" v-show="isLogin">
            <router-link to="/address">
              <p class="tools-bar-item-title">
                <i class="icon-location"></i>
                <i class="icon-arrow"></i>
                地址管理
              </p>
            </router-link>
          </div>
          <div class="tools-bar-item custome">
            <p @click="expand('custome')" class="tools-bar-item-title">
              <i class="icon-phone"></i>
              <i class="icon-arrow"></i>
              客服热线
            </p>
            <div class="content" v-show="isExpand.custome">
              <p>客服电话: 8008208820</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
  export default {
    inject:['reload'],
    data() {
      return {
        isLogin: false,
        isVisibale: false,
        isExpand: {
          order: false,
          custome: false
        },
        username:'',
        userId:''
      }
    },
    mounted() {
      if(JSON.stringify(this.$store.state.session.currentUser)!='{}'){
        this.username = this.$store.state.session.currentUser.cname
        this.userId = this.$store.state.session.currentUser.cust_id
        this.isLogin = !this.isLogin
      }
    },
    methods: {
      handleLogout() {
        this.$store.commit('userStatus', null);
        this.isLogin = !this.isLogin
        this.reload();
      },
      showMore() {
        this.isVisibale = !this.isVisibale
      },
      expand(type) {
        this.isExpand[type] = !this.isExpand[type]
      },
      loginOrRegister() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  main{
    section{
      height: 100%;
      position: relative;
      .logout{
        position: absolute;
        right: 30px;
        font-size: 28px;
        color: #fff;
        top: 50px;
        z-index: 2;
      }
      .top{
        background: #141414;
        box-shadow: 0 7px 16px 0 #000000;
        height: 393px;
        position: relative;
        .avatar{
          position: absolute;
          width: 138px;
          height: 138px;
          border-radius: 50%;
          background: #fff;
          top: 68px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          img{
            width: 138px;
            height: 138px;
          }
        }
        &-bg{
          width: 690px;
          height: 290px;
          margin: 0 auto;
          position: relative;
          top: 142px;
          background: url('../../assets/card.png') no-repeat center / cover;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          box-shadow: 0 8px 23px 0 rgba(0,0,0,0.27);
          z-index: 1;
          .nickname{
            position: absolute;
            top: 75px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.85;
            font-size: 28px;
            color: #755721;
            letter-spacing: 0;
          }
          .vipnum, .priod{
            position: absolute;
            bottom: 25px;
            font-family: PingFangSC-Medium;
            font-size: 22px;
            color: #755721;
            letter-spacing: 0;
          }
          .vipnum{
            left: 30px;
          }
          .priod{
            right: 30px;
          }
        }
      }
      .bottom{
        height: 100%;
        padding: 119px 30px 0 30px;
        background: #222222;
        .tools-bar{
          flex-direction: column;
          &-item{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 37px;
            background: linear-gradient(0deg, #3B3B3B 0%, #D9D9D9 100%);
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.06);
            border-radius: 15px;
            a{
              display: block;
              text-decoration: none;
              color: rgba(255, 255, 255, .8);
            }
            &-title{
              min-height: 78px;
              line-height: 78px;
              margin: 0 57px 0 19px;
              font-size: 28px;
              color: rgba(255, 255, 255, .8);
              letter-spacing: 0;
              position: relative;
              border-bottom: 2px solid #6E6C6C;

              .icon-location{
                display: inline-block;
                width: 28px;
                height: 28px;
                background: url('../../assets/icons/location.svg') no-repeat center;
                background-size: 28px;
                vertical-align: middle;
              }
              .icon-arrow{
                display: inline-block;
                width: 15px;
                height: 15px;
                position: absolute;
                right: 3px;
                top: 50%;
                border-top: 2px solid #757575;
                border-right: 2px solid #757575;
                transform: rotate(45deg) translateY(-50%);
              }
              .icon-car{
                display: inline-block;
                width: 35px;
                height: 30px;
                background: url('../../assets/icons/car.svg') no-repeat center;
                background-size: 35px 30px;
                vertical-align: middle;
              }
              .icon-phone{
                display: inline-block;
                width: 35px;
                height: 30px;
                background: url('../../assets/phone.png') no-repeat center;
                background-size: 35px 30px;
                vertical-align: middle;
              }
            }
            .content{
              .timeline{
                flex-direction: column;
                min-height: 373px;
                overflow-y: scroll;
                margin-bottom: 24px;
                .timeline-item{
                  padding:30px 0 0 61px;

                  .timeline-step{
                    display: inline-block;
                    width: 19px;
                    height: 19px;
                    background: #4AC1A2;
                    border-radius: 50%;
                    margin-right: 20px;
                  }
                  .timeline-btn{
                    display: inline-block;
                    width: 130px;
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
                    background: #4AC1A2;
                    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
                    border-radius: 47px;
                    font-size: 24px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                  }
                  .uncheck{
                    background: #9F9F9F;
                  }
                  .timeline-time{
                    margin-top: 10px;
                    padding-left: 40px;
                    margin-left: 10px;
                    margin-bottom: 10px;
                    font-size: 20px;
                    height: 35px;
                    color: rgba(255,255,255,.8);
                    letter-spacing: 0;
                    border-left: 1px dotted #979797;
                  }
                }
              }
            }
            .order{
              padding-bottom: 37px;
            }
            .show-more{
              position: absolute;
              display: inline-block;
              left: 50%;
              bottom: 37px;
              transform: translateX(-50%);
              font-size: 16px;
              color: rgba(255,255,255,.28);
              letter-spacing: 0;
              font-style: normal;
            }
          }
          .address{
            .tools-bar-item-title{
              border: none;
            }
          }
          .custome{
            .content{
              p{
                padding: 30px;
                color: rgba(255, 255, 255, .8);
              }
            }
          }
        }
      }
    }
  }
</style>

