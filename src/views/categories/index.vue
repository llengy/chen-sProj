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
    <div class="footer">
      <div @click="popupVisible=true" class="footer-left"></div>
      <div class="footer-center">
        <p>￥{{totalPrice | priceFilter}}</p>
        <span>另需服务费¥10.0</span>
        <span class="tip">支持自送</span>
      </div>
      <div class="footer-right" @click="handleSettle">
        去结算
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade">
      123
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
      goodsObj:{}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(vm.$router.currentRoute.params.sel) {
        vm.selected = vm.$router.currentRoute.params.sel
      }
    })
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
        this.categoryList = response.data.rows;
        this.selected = this.categoryList[0].cat_no;
        this.getGoodsByCatNo();
    },response => {
        alert('找不到服务器!');
      })
    },
    getGoodsByCatNo:function () {
      for(let i = 0; i <  this.categoryList.length; i++){
        this.$http.post('/api/admin/goods/getGoodsList',{catNo:this.categoryList[i].cat_no}
          ).then(response =>{
          this.$set(this.goodsObj,this.categoryList[i].cat_no,response.data.rows);
          },response=>{

        })
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
    },
    handleSettle() {
      // for(let i = 0;i<this.categoryList.length;i++){
      //   for(let j = 0;j<this.goodsObj[this.categoryList[i].cat_no].length;j++){
      //     if(this.goodsObj[this.categoryList[i].cat_no][j].total){
      //
      //     }
      //   }
      // }
      // console.log(this.totalGoods);

      // console.log(this.totalGoods);
      // console.log(this.goodsObj);
      this.$router.push({
        name:'order',
        params:{
          totalPrice:this.totalPrice,
          totalGoods:this.goodsObj,
          categoryLists:this.categoryList
        }
      })
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
        // .row{
        //   display: flex;
        //   flex-wrap: wrap;
        //   align-content: space-between;
        //   padding: 0;
        //   margin: 0;
        //   .item{
        //     flex: 1;
        //     text-align: center;
        //     height: 300px;
        //     border: 1px solid rgba(255,255,255,0.1);
        //     border-radius: 0px 19px 19px 0px;
        //     &:nth-child(2) {
        //       border-radius: 19px;
        //     }
        //     &:nth-child(3) {
        //       border-radius: 19px 0px 0px 19px;
        //     }
        //   }
        // }
      }
    }

  }
  .footer{
    display: flex;
    flex-direction: row;
    width: 670px;
    height: 148px;
    text-align: center;
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 7px 13px 0 rgba(0,0,0,0.28);
    z-index: 1;
    position: relative;
    background: url('../../assets/bg03.png') no-repeat center /cover;

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
  .mint-popup-bottom{
    width: 100%;
    height: 45%;
  }
}

</style>

