<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <section>
      <ul class="flex-list">
        <li class="list-item address" @click="jump('address')">
          <template v-if="address">
            <div class="item-top">
              <span>{{address.recevier}}</span>
              <span>{{address.mobile}}</span>
            </div>
            <p class="item-bottom">{{address.address}}</p>
          </template>
          <p v-else>请选择地址</p>
          <i class="cus-icon-arrow"></i>
        </li>
        <li class="list-item store">
          <p>干洗门店 (自动分配)</p>
          <p id="shopName" >{{shopName}}</p>
        </li>
        <li class="list-item picker" @click="openPicker">
          <p>请选择取衣时间</p>
          <p>{{pickTime}}</p>
          <i class="cus-icon-arrow"></i>
        </li>
        <li class="list-item order-detail">
          <p class="title">洗涤明细</p>
          <div class="detail-box">
            <ul class="box-content">
              <li class="box-item" v-for="item in goods">
                <p>
                  <span>{{item.goods_name}}</span>
                  <span>x{{item.total}}</span>
                </p>
                <span>￥{{item.total*item.price | priceFilter}}</span>
              </li>
            </ul>
          </div>
          <div class="order-total">
            <span>服务费：</span>
            <span v-if="totalPrice >= 50">￥10</span>
            <span v-if="totalPrice >= 50">￥{{serviceTip}}</span>
            <p v-else>￥{{serviceTip | priceFilter}}</p>
          </div>
        </li>
        <li class="list-item comment">
          <textarea class="cus-text" placeholder="备注（可不填写）" v-model="comment" rows="4"></textarea>
        </li>
      </ul>
      <mt-datetime-picker
        ref="picker"
        type="datetime"
        :startDate="startDate"
        :endDate="endDate"
        :startHour="startHour"
        :endHour="endHour"
        year-format="{value}"
        month-format="{value}月"
        date-format="{value}日"
        hour-format="{value}时"
        @confirm="handleSel"
        v-model="pickerValue">
      </mt-datetime-picker>
    </section>
    <div class="cus-btn">
      <p class="pay-total">合计：￥{{totalPrice+serviceTip | priceFilter}}</p>
      <p @click="pay" class="pay">支付宝支付</p>
    </div>
  </main>
</template>
<script>
import MyHeader from '@/components/header'
import AMap from 'AMap';
export default {
  components: {
    MyHeader
  },
  data () {
    return {
      headerParam: {
        title: '订单信息',
        path: 'category',
        tabname: ''
      },
      comment: '',
      pickerValue: new Date(),
      startHour: 7,
      endHour: 23,
      startDate: new Date('2019'),
      endDate: new Date('2019-03-26'),
      comment: '',
      pickTime: '',
      address: '',
      shopName: '',
      shopNO:'' , //自动分配的门店编号,
      orderId:''

    }
  },
  computed: {
    goods() {
      return this.$store.state.shopCart.mycart
    },
    totalPrice() {
      let sum = 0
      this.goods.forEach(item => {
        sum = sum + (item.total * item.price)
      });
      return sum
    },
    serviceTip() {
      return this.totalPrice >= 50 ? 0 : 10
    }
  },
  mounted() {

    if(this.$router.currentRoute.params.selectedAddress) {
      this.address = this.$router.currentRoute.params.selectedAddress
    }
    this.laundryShop()
  },
  methods: {
    laundryShop(){
      //获取解析地址
      this.geocoder = new AMap.Geocoder();
       this.geocoder.getLocation(this.address.address, function(status, result) {
        if (status === 'complete'&&result.geocodes) {}});

       //获取返回数据
      AMap.event.addListener(this.geocoder,"complete",(data) =>{
        let city  =  data.geocodes[0].addressComponent.district;
        this.$http.post(this.$Api.getShopName,{
          shop_address: city
        }).then(response => {
          if (this.$global.successCode == response.data.code) {
                this.shopName = response.data.data.rows[0].shop_name;
                document.getElementById('shopName').value = this.shopName
          } else {
            this.$toast(response.data.desc);
          }
        }, response => {
          this.$toast('找不到服务器!');
        });
      })
    },
    pay(){

      if(this.pickTime === '') {
        this.$toast('请选择取衣时间')
        return
      }
      if(this.address === '') {
        this.$toast('请选择地址')
        return
      }
      //清空购物车
      this.$store.commit('CLEAR_CART');
      //创建订单
      this.createOrder();
      this.$http.post(this.$Api.payPage,{
        //商户订单号
        WIDout_trade_no: "123456789",
        //订单名称
        WIDsubject: "1",
        //付款金额
        WIDtotal_amount: "123",
        //商品描述
        WIDbody: "",
      }).then(response => {

        this.html = response.data
        var form= response.data;
        // console.log(url)

        const div = document.createElement('div')
        div.innerHTML = form//此处form就是后台返回接收到的数据
        document.body.appendChild(div)
        document.forms[0].submit()

      }, response => {
        this.$toast('找不到服务器!');
      });
    },
    createOrder(){
      //创建订单
      let arr = [];
      this.$store.state.shopCart.mycart.forEach(item => {
        arr[arr.length] =JSON.stringify(item);
    });
      let goodsStr = arr.join(',')
      let param = {
        shopNO :this.shopNO,
        appointDate : this.pickTime,//预约取衣时间
        price:this.totalPrice,
        remark:this.comment,//备注
        addressId : this.address.address_id,// 地址id
        custId : this.$store.state.session.currentUser.cust_id,
        goodsStr:goodsStr//订单详情
      }

      this.$http.post(this.$Api.createOrder,param)
        .then(response =>{
        if(this.$global.successCode == response.data.code){
        this.orderId = response.data.data.orderId;
        console.log(this.orderId)
      }else{
        this.$toast(response.data.desc);
        return;
      }
    },response=>{
        this.$toast('找不到服务器!');
      })

    },
    openPicker() {
      let end = this.formateDate(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      this.endDate = new Date(end)
      this.$refs.picker.open()
    },
    handleSel(event) {
      this.pickTime = this.formateMins(event)
      console.log(this.pickTime)
    },
    jump(path) {
      this.$router.push({
        name: path,
        params: {
          path: 'order',
        }
      })
    },
    formateDate(d) {
      let t = new Date(d)
      let year = t.getFullYear()
      let month = t.getMonth() + 1
      if (month < 10) { month = '0' + month }
      let date = t.getDate()
      if (date < 10) { date = '0' + date }
      return year + '-' + month + '-' + date
    },
    formateMins(ms) {
      let t = new Date(ms)
      let year = t.getFullYear()
      let month = t.getMonth() + 1
      if (month < 10) { month = '0' + month }
      let date = t.getDate()
      if (date < 10) { date = '0' + date }
      let hour = t.getHours()
      if (hour < 10) { hour = '0' + hour }
      let minute = t.getMinutes()
      if (minute < 10) { minute = '0' + minute }
      let second = t.getSeconds()
      if (second < 10) { second = '0' + second }
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>
<style lang="less" scoped>
  main{
    height: 100%;
    section{
      height: 100%;
      padding: 30px;
      margin-top: 80px;
      background: #222222;
      .flex-list{
        display: flex;
        flex-direction: column;

        .list-item{
          box-sizing: border-box;
          position: relative;
          padding: 30px;
          min-height: 88px;
          background: rgba(59,59,59,0.7);
          border-radius: 4px;
          margin-bottom: 30px;
          opacity: 0.6;
          font-size: 35px;
          color: #FFFFFF;
          letter-spacing: 0;
          .item-top{
            margin-bottom: 20px;
            span{
              &:first-child{
                margin-right: 53px;
              }
            }
          }
          .item-bottom{
            font-size: 20px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
          p{
            font-size: 24px;
            color: rgba(255,255,255,.8);
            letter-spacing: 0;
          }
          .cus-icon-arrow{
            display: inline-block;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 10px;
            height: 10px;
            border-top: 3px solid #fff;
            border-right: 3px solid #fff;
          }
        }
        .store{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          p{
            &:nth-child(2) {
              font-size: 24px;
              color: #56CBAC;
              letter-spacing: 0;
              text-align: right;
            }
          }
        }
        .picker{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          p{
            &:nth-child(2) {
              margin-right: 30px;
            }
          }
        }
        .address{
          max-height: 144px;
        }
        .comment{
          box-sizing: border-box;
          textarea{
            box-sizing: border-box;
            padding: 0;
            width: 100%;
            font-size: 28px;
            color: #FFFFFF;
            letter-spacing: 0;
            background: rgba(59,59,59,.7);
            border: none;
            ::-webkit-input-placeholder{
              font-size: 28px;
              color: #FFFFFF;
            }
          }
        }
        .order-detail{
          // height: 342px;
          padding: 20px 30px;
          .title{
            font-size: 24px;
            color: rgba(255,255,255,.8);
            letter-spacing: 0;
            margin-bottom: 20px;
          }
          .detail-box{
            box-sizing: border-box;
            padding: 20px 40px;
            min-height: 180px;
            background: rgba(162,162,162,0.28);
            border-radius: 4px;
            .box-content{
              display: flex;
              flex-direction: column;
              .box-item{
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
                &:last-child{
                  margin-bottom: 0;
                  /*margin-right: 10px;*/
                }
                p{
                  span{
                    &:first-child{
                      display: inline-block;
                      width: 130px;
                      margin-right: 45px;
                    }
                  }
                }

              }
            }
          }
          .order-total{
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
            span{
              line-height: 1;
              &:nth-child(1){
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
              }
              &:nth-child(2) {
                font-size: 18px;
                color: #FE5959;
                letter-spacing: 0;
                text-align: right;
                text-decoration: line-through;
                padding-top: 3px;
              }
              &:nth-child(3) {
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: right;
              }
            }
          }
        }
      }

      .mint-datetime{
        background: #3B3B3B;
        /deep/ .picker-item{
          font-size: 28px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        /deep/ .picker-selected{
          color: rgba(42,164,133,1);
        }
        /deep/ .mint-datetime-action{
          color: rgba(42,164,133,1);
        }
      }

    }
    .cus-btn{
      height: 95px;
      line-height: 95px;
      position: fixed;
      bottom: 0;
      z-index: 2;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .pay-total{
        padding-left: 57px;
        font-size: 35px;
        color: #FFFFFF;
        letter-spacing: 0;
        background: #3B3B3B;
        flex: 1;
      }
      .pay{
        width: 225px;
        background: rgba(112,226,195,1);
        font-size: 30px;
        color: #FFFFFF;
        letter-spacing: 0;
        box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
        text-align: center;
      }
    }
  }
</style>


