<template>
  <main>
    <mt-header fixed title="订单信息"></mt-header>
    <section>
      <div class="empty" v-if="isEmpty">
        <img src="../../assets/empty.png" alt="">
        <p>暂无订单,赶快下单吧~</p>
      </div>
      <ul v-if="!isEmpty" class="flex">
        <li class="flex-item">
          <div class="top">
            <p class="top-left">待付款</p>
            <div class="top-right">
              <p>订单编号 : 100001</p>
              <p>取件时间 : 2019.04.01  08:00 - 09:00</p>
            </div>
          </div>
          <div class="flex bottom">
            <p class="bottom-left">支付费用: ￥57</p>
            <div class="bottom-right flex">
              <p>取消订单</p>
              <p>立即支付</p>
            </div>
          </div>
          <i @click="showDetail" class="arrow"></i>
        </li>
        <li class="flex-item">
          <div class="top">
            <p class="top-left">待确认</p>
            <div class="top-right">
              <p>订单编号 : 100001</p>
              <p>取件时间 : 2019.04.01  08:00 - 09:00</p>
            </div>
          </div>
          <div class="flex bottom">
            <p class="bottom-left">支付费用: ￥57</p>
            <div class="bottom-right flex">
              <p class="assure">立即确认</p>
            </div>
          </div>
          <i @click="showDetail" class="arrow"></i>
        </li>
        <li class="flex-item">
          <div class="top">
            <p class="top-left">待确认</p>
            <div class="top-right">
              <p>订单编号 : 100001</p>
              <p>取件时间 : 2019.04.01  08:00 - 09:00</p>
            </div>
          </div>
          <div class="flex bottom">
            <p class="bottom-left">支付费用: ￥57</p>
            <div class="bottom-right flex">
              <p class="assure">立即评价</p>
            </div>
          </div>
          <i @click="showDetail" class="arrow"></i>
        </li>
      </ul>
    </section>
  </main>
</template>
<script>
import MyHeader from '@/components/header'
export default {
  components: {
    MyHeader
  },
  data() {
    return {
      isEmpty: false,
    }
  },
  methods: {
    showDetail() {
      this.$router.push({
        path: '/orderDetail'
      })
    }
  }
}
</script>
<style lang="less" scoped>
section{
  padding: 20px;
  margin-top: 100px;
  background: #222222;
  height: 100%;
  .empty{
    text-align: center;
    img{
      width: 408px;
      margin-top: 130px;
    }
    p{
      margin-top: 80px;
      font-size: 28px;
      color: rgba(255, 255, 255, .5);
      letter-spacing: 0;
      text-align: center;
    }
  }
  .flex{
    height: auto;
    flex-direction: column;
    .flex-item{
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 248px;
      min-height: 248px;
      background: #3B3B3B;
      border-radius: 4px;
      margin-bottom: 30px;
      padding: 38px 27px 0px 44px;
      display: flex;
      flex-direction: column;
      .arrow{
        position: absolute;
        width: 10px;
        height: 10px;
        right: 27px;
        top: 35%;
        transform: translateY(-50%) rotate(45deg);
        border-top: 2px solid #FFFFFF;
        border-right: 2px solid #FFFFFF;
      }
      .top{
        display: flex;
        padding-bottom: 29px;
        border-bottom: 2px solid rgba(110,108,108,0.4);
        .top-left{
          width: 91px;
          height: 91px;
          line-height: 91px;
          text-align: center;
          border-radius: 50%;
          font-size: 18px;
          color: #FFFFFF;
          letter-spacing: 0;
          background-image: radial-gradient(0% 100%, #70E2C3, #128F70);
          box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
          margin-right: 32px;
        }
        .top-right{
          line-height: 2;
          p{
            &:nth-child(1) {
              font-size: 26px;
              color: #FFFFFF;
              letter-spacing: 0;
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              opacity: 0.5;
              font-size: 20px;
              color: #FFFFFF;
              letter-spacing: 0;
            }
          }
        }
      }
      .bottom{
        flex-direction: row;
        padding: 20px 0;
        justify-content: space-between;
        .bottom-left{
          font-size: 26px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 1.5;
        }
        .bottom-right{
          flex-direction: row;
          justify-content: space-around;
          p{
            width: 130px;
            height: 42px;
            line-height: 42px;
            background: #70E2C3;
            box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
            border-radius: 47px;
            font-size: 18px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            &:nth-child(1){
              margin-right: 20px;
            }
          }
          .assure{
            background: transparent;
            border: 1px solid rgba(18,143,112,1);
          }
        }
      }
    }
  }
}
</style>


