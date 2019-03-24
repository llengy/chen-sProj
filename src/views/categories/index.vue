<template>
  <main>
    <MyHeader :headers="headerParam"/>
    <mt-navbar v-model="selected" >
      <mt-tab-item :id="cats.cat_no" v-for="(cats,index) in categoryList" :key="index">{{cats.cat_name}}</mt-tab-item>
    </mt-navbar>
    <div class="section">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <mt-tab-container v-model="selected">
          <!--详情页-->
          <mt-tab-container-item :id="cats.cat_no" v-for="(cats,index) in categoryList" :key="index">
            <div class="nav-content">
              <FlexBox @add-to-cart="handleAdd" :data="goodsObj[cats.cat_no]" />
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-loadmore>
      <!-- tab-container -->
    </div>
    <div class="footer" style="z-index: 2016">
      <div @click="toggleCart" class="footer-left"></div>
      <div class="footer-center">
        <p>￥{{totalPrice | priceFilter}}</p>
        <span>另需服务费¥10.0</span>
        <!-- <span class="tip">支持自送</span> -->
      </div>
      <div class="footer-right" @click="handleSettlement">
        去结算
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="my-popup">
      <div class="popup-content">
        <div class="popup-head">
          <i class="icon-trash"></i>
          <span class="head-txt" @click="clearCart">清空</span>
        </div>
        <div class="popup-body">
          <ul class="flex cart">
            <li class="flex cart-item" v-for="(item, index) in myCart" :key="index">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.price | priceFilter}}</p>
              <p class="flex">
                <span class="sub" @click.stop="handleSub(item)">-</span>
                <span class="num">{{item.total}}</span>
                <span class="add" @click.stop="handleSum(item)">+</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </main>
</template>
<script>
import MyHeader from '@/components/header'
import FlexBox from '@/components/flexBox'
export default {
  components: {
    MyHeader,
    FlexBox
  },
  data () {
    return {
      popupVisible: false,
      categoryList:'',
      totalPrice: 0,
      headerParam: {
        title: '专业清洗',
        path: 'index',
        tabname: '首页'
      },
      selected: '',
      subAcitve: 0,
      goodsObj:{},
      myCart:[]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(vm.$router.currentRoute.params.sel) {
        vm.selected = vm.$router.currentRoute.params.sel
      }else{
        vm.selected = vm.categoryList[0].cat_no;
      }
    })
  },
  computed:{

  },
  mounted:function () {
    this.getCategoryList();
  },
  methods: {
    /**
     * 获取到所有分类
     */
    getCategoryList:function () {
      this.$http.post('/api/admin/cat/getCategoryList',{
      }).then(response =>{
        this.categoryList = response.data.data.rows;
        if(this.$route.params.sel) {
          this.selected = this.$route.params.sel
        }else{
          this.selected = this.categoryList[0].cat_no;
        }
        this.getGoodsByCatNo();
    },response => {
        this.$toast('找不到服务器!')
      })
    },
    getGoodsByCatNo:function () {
      for(let i = 0; i <  this.categoryList.length; i++){
        this.$http.post('/api/admin/goods/getGoodsList',{catNo:this.categoryList[i].cat_no}
          ).then(response =>{
          this.$set(this.goodsObj,this.categoryList[i].cat_no,response.data.data.rows);
          },response=>{

        })
      }
    },
    //清空
    clearCart() {
      this.myCart = []
      this.totalPrice = 0
      this.popupVisible = false
    },
    // 去结算
    handleSettlement() {
      if(this.myCart.length === 0) {
        this.$toast('请添加商品!')
        return
      } else {
        this.$store.commit('UPDATE_CART', this.myCart)
        this.$router.push('order')
      }
    },
    activeTab(index) {
      this.subAcitve = index
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded()
    },
    handleAdd(item, index) {
      let total = 0
      this.totalPrice += Number(this.goodsObj[item.cat_no][index].price)
      if(!this.goodsObj[item.cat_no][index].total) {
        this.$set(this.goodsObj[item.cat_no][index], "total", 1)
      } else {
        let total = this.goodsObj[item.cat_no][index].total + 1
        this.$set(this.goodsObj[item.cat_no][index], "total", total)
      }
      // console.log(item);
      // 加入到购物车
      Array.prototype.indexOf = function(val) {
        // console.log(val);
        for (let i = 0; i < this.length; i++) {
          if (this[i].goods_no == val) return i;
        }
        return -1;
      }
      if(this.myCart.length === 0) {
        this.myCart.push(item)
      } else {
        let indexOf = this.myCart.indexOf(item.goods_no)
        if(indexOf < 0) {
          this.myCart.push(item)
        }
      }
    },
    toggleCart() {
      this.popupVisible = !this.popupVisible

    },
    // 添加数量
    handleSub(item){
      this.myCart.forEach((data, index) => {
        if(data.goods_no === item.goods_no) {
          if(item.total >= 1) {
            data.total -= 1
          } else {
            this.myCart.splice(index, 1)
          }
        }
      });
      let total = 0
      this.myCart.forEach(item => {
        total = total + (item.total * item.price)
      });
      this.totalPrice = total
    },
    handleSum(item) {
      let total = 0
      this.myCart.forEach((data, index) => {
        if(data.goods_no === item.goods_no) {
          if(data.total < 50) {
            data.total += 1
          }
        }
        total = total + (data.total * data.price)
      });
      this.totalPrice = total
    }
  }
}
</script>
<style lang="less" scoped>
main{
  height: 100%;
  position: relative;
  background: #222222;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  .mint-navbar{
    justify-content: space-around;
    padding: 0 20px;
    margin-top: 80px;
    border-bottom: 1px solid #ddd;
    background-color: #1E1D1D;
    box-shadow: 0 7px 24px 0 rgba(0,0,0,0.32);
    border-bottom: none;

    .mint-tab-item{
      font-size: 26px;
      color: #FFFFFF;
      letter-spacing: 0;
      flex: none;
    }
  }
  .mint-navbar .mint-tab-item.is-selected{
    color: #56CBAC;
    margin-bottom: -2px;
    border-bottom-color: #56CBAC;
  }
  .section{
    height: 100%;
    padding-top: 30px;
    // background: #222222;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .mint-tab-container{
      // background: #222222;
      .nav-content{
        li{
          list-style: none;
        }
      }
    }

  }
  .footer{
    display: flex;
    flex-direction: row;
    width: 670px;
    // height: 148px;
    text-align: center;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
    position: relative;
    background: url('../../assets/bg03.png') no-repeat top /cover;


    .footer-left{
      width: 131.6px;
      height: 148px;
    }
    .footer-center{
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 362px;
      left: 130px;
      height: 94px;
      padding-top: 7px;
      text-align: left;
      p{
        font-size: 36px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
      }
      span{
        display: inline-block;
        opacity: 0.2;
        font-family: PingFangSC-Regular;
        font-size: 21px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
      }
      .tip{
        margin-left: 15px;
        padding-left: 15px;
        border-left: 2px solid rgba(255,255,255,0.8);
      }
    }
    .footer-right{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 200px;
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .my-popup{
    width: 100%;
    height: 50%;
    margin-bottom: 50px;
    background: transparent;
    color: #fff;
    .popup-content{
      display: flex;
      flex-direction: column;
      background: #3B3B3B;
      margin: 0 20px;
      height: 100%;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      .popup-head{
        padding: 20px 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: #6E6C6C;
        text-align: right;
        .head-txt{
          font-size: 20px;
        }
        .icon-trash{
          display: inline-block;
          height: 30px;
          width: 30px;
          background: url('../../assets/icons/trash.svg') no-repeat left;
          background-size: 30px;
          vertical-align: bottom;
        }
      }
      .popup-body{
        flex: 1;
        overflow: auto;
        padding: 0 15px;
        margin-bottom: 100px;
        .cart{
          flex-direction: column;
          .cart-item{
            flex-direction: row;
            justify-content: space-between;
            padding: 30px 20px;
            border-bottom: 1px solid #4E4D4D;
            &:last-child{
              border-bottom: none;
            }
            p{
              flex: 1;
              font-size: 26px;
              &:nth-child(1){
                flex: 2;
              }
              &:nth-child(2){
                text-align: center;
              }
              &:nth-child(3){
                text-align: center;
                justify-content: flex-end;
                line-height: 37px;
                .sub,.add{
                  background: #6E6C6C;
                  display: inline-block;
                  width: 37px;
                  height: 37px;
                  border-radius: 50%;
                  font-size: 18px;
                }
                .num{
                  display: inline-block;
                  margin: 0 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>

