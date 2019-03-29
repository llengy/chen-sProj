<template>
  <main>
    <mt-header fixed title="订单信息" >
      <mt-button  slot="right" class="logout" v-if="!isLogin" @click="loginOrRegister">登录/注册</mt-button>
    </mt-header>
    <section>
      <div class="noLogin" v-if="!isLogin">
        <img src="../../assets/noLogin.png" alt="">
        <p>暂未登录, 赶快登录吧~</p>
      </div>
      <div class="empty" v-if="isLogin && isEmpty">
        <img src="../../assets/empty.png" alt="">
        <p>暂无订单,赶快下单吧~</p>
      </div>
      <ul v-if="isLogin && !isEmpty" class="flex">
        <li class="flex-item" v-for="(item,index) in orderTotal" :key="index">
          <div class="top" @click="showDetail(item)">
            <p class="top-left">{{item.status}}</p>
            <div class="top-right">
              <p>订单编号 : {{item.order_id}}</p>
              <p>取件时间 : {{item.takeDate}}</p>
            </div>
          </div>
          <div class="flex bottom">
            <p class="bottom-left">支付费用: ￥{{item.price | priceFilter}}</p>
            <div class="bottom-right flex" v-if="item.status === '待付款'">
              <p @click="cancelOrder(item)">取消订单</p>
              <p @click="payOrder(item)">立即支付</p>
            </div>
            <div class="bottom-right flex" v-if="item.status === '待确认'">
              <p @click="confirmOrder(item)">确认收衣</p>
            </div>
            <div class="bottom-right flex" v-if="item.status === '待评价'">
              <p class="eva-button" @click="showReview(item)">评价</p>
            </div>
          </div>
          <i class="arrow"></i>
        </li>
      </ul>
    </section>
    <div class="mask" @click="isVisibale=false" style="z-index: 99" v-show="isVisibale"></div>
    <div class="dialog" style="z-index: 100" v-show="isVisibale">
      <div class="dialog-title">订单评价</div>
      <div class="dialog-body">
        <ul class="flex eva-tabs">
          <li @click="switchEva(0)" class="tab" :class="{active: tabIndex === 0}">好评</li>
          <li @click="switchEva(1)" class="tab" :class="{active: tabIndex === 1}">中评</li>
          <li @click="switchEva(2)" class="tab" :class="{active: tabIndex === 2}">差评</li>
        </ul>
        <div class="eva-content">
          <div class="box-title">
            <span>评价详情</span>
            <span class="tips">(可不填写)</span>
          </div>
          <textarea class="cus-textarea" v-model="evaluationTxt" rows="4"></textarea>
        </div>
      </div>
      <div class="dialog-footer">
        <p class="eva-button" @click="review">保存评价</p>
      </div>
    </div>
  </main>
</template>
<script>
  import MyHeader from '@/components/header'
  export default {
    components: {
      MyHeader
    },
    inject: ['reload'],
    data() {
      return {
        isEmpty: false,
        isVisibale: false,
        evaluationTxt: '',
        tabIndex: 0,
        orderTotal:[],
        orderId:'',
        isLogin:false
      }
    },
    created(){
      this.getOrderTotal();
    },
    mounted() {
      if(JSON.stringify(this.$store.state.session.currentUser)!='{}'){
        this.isLogin = !this.isLogin
      }
    },
    methods: {
      switchEva(index) {
        this.tabIndex = index
      },
      showDetail(data) {
        // console.log(data)
        this.$router.push({
          name: 'orderDetail',
          params:{
            selectedOrder:data
          }
        })
      },
      evaluation() {
        this.isVisibale = !this.isVisibale
      },
      showReview(data){
        // console.log(data);
        this.orderId = data.order_id;
        this.isVisibale = !this.isVisibale;
      },
      //得到订单概览
      getOrderTotal(){
        this.$http.post(this.$Api.orderTotal,{
          custId:this.$store.state.session.currentUser.cust_id
        }).then(response =>{
          if(this.$global.successCode == response.data.code){
          this.orderTotal = response.data.data.rows;
          if(0 === this.orderTotal.length){
            this.isEmpty = !this.isEmpty;
          }
          // console.log(item.order_id);
        }else{
          this.$toast(response.data.desc)
        }
      },response => {
          this.$toast('找不到服务器!')
        })
      },
      /**
       * 订单评价
       */
      review(){
        let param ={
          custId : this.$store.state.session.currentUser.cust_id,
          orderId : this.orderId,
          content : this.evaluationTxt,
          rate:this.tabIndex
        }
        this.$http.post(
          this.$Api.review,param
        ).then(response =>{
          if(this.$global.successCode === response.data.code){
            this.$toast("评价成功");
            this.isVisibale = !this.isVisibale;
            this.reload();
            this.$router.push({
              name: 'index',
              params: {
                sel: '订单'
              }
            })
          }else{
            this.$toast(response.data.desc);
          }
      },response=>{
          this.$toast('找不到服务器');
        })

      },
      /**
       * 订单付款
       */
      payOrder(item){
        console.log(item.order_id)
        this.$http.post(this.$Api.payPage,{
          //商户订单号
          WIDout_trade_no: item.order_id,
          //订单名称
          WIDsubject: "干洗服装",
          //付款金额
          WIDtotal_amount: item.price,
          //商品描述
          WIDbody: "",
        }).then(response =>{
            this.html = response.data
            var form= response.data;
            const div = document.createElement('div')
            div.innerHTML = form//此处form就是后台返回接收到的数据
            document.body.appendChild(div)
            document.forms[0].submit()
            //清空购物车
            this.$store.commit('CLEAR_CART');

        },response => {
          this.$toast('找不到服务器!')
        })
      },
      /**
       * 取消订单
       */
      cancelOrder(item){
        this.$http.post(this.$Api.cancelOrder,{
          orderId:item.order_id
        }).then(response =>{
          if(this.$global.successCode == response.data.code){
          this.$toast("取消订单成功")
          this.reload()
          }else{
          this.$toast(response.data.desc)
        }
      },response => {
          this.$toast('找不到服务器!')
        })
      },
      loginOrRegister() {
        this.$router.push('/login')
      },
      confirmOrder(item){
        this.$http.post(this.$Api.confirmOrder,{
          orderId:item.order_id,
          confirm:'待评价'
        }).then(response =>{
          if(this.$global.successCode == response.data.code){
          this.$toast("确认成功")
          this.reload()
        }else{
          this.$toast(response.data.desc)
        }
      },response => {
          this.$toast('找不到服务器!')
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
    .noLogin{
      text-align: center;
      img{
        width: 455px;
        margin-top: 130px;
        height: 334px;
        margin-left: 100px;
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
            background:#128F70;
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
  .logout{
    font-size: 26px;
    text-align: center;
    color: #fff;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.38);
  }
  .dialog{
    box-sizing: border-box;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 400px;
    background: #3B3B3B;
    border-radius: 4px;
    padding: 30px 25px 20px 25px;
    &-title{
      font-size: 26px;
      text-align: center;
      color: #fff;
    }
    &-body{
      .eva-tabs{
        margin: 30px 0;
        .tab{
          box-sizing: border-box;
          background: transparent;
          color: #57C0A5;
          font-size: 18px;
          width: 98px;
          height: 42px;
          text-align: center;
          border-radius: 47px;
          line-height: 42px;
          border: 1px solid #57C0A5;
          &.active{
            background: #56CCAD;
            color: #fff;
            border-color: #56CCAD;
          }
          &:nth-child(2) {
            margin: 0 30px;
          }
        }
      }
      .eva-content{
        .box-title{
          span{
            font-size: 28px;
            color: rgba(255, 255, 255, .8)
          }
          .tips{
            font-size: 20px;
            color: rgba(255, 255, 255, .4)
          }
        }
        .cus-textarea{
          width: 100%;
          background: #575757;
          padding: 0;
          border: none;
          border-radius: 4px;
          margin-top: 2px;
          color: rgba(255, 255, 255, .8);
          font-size: 24px;
        }
      }
    }
    &-footer{
      text-align: center;
      padding-top: 20px;
      .eva-button{
        width: 130px;
        height: 42px;
        line-height: 42px;
        margin: 0 auto;
        background: #70E2C3;
        box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
        border-radius: 47px;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
</style>


